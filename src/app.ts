/*
 * Copyright 2024 Console Connect
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import OpenAPIBackend, { Request } from "openapi-backend";
import express, {
  Request as ExpressReq,
  Response as ExpressRes,
} from "express";
import pinoHttp from "pino-http";
import { setStartTime, heartbeat } from "./handlers/heartbeat";
import pino from "pino";
import addFormats from "ajv-formats";

export const createApp = async (
  log?: pino.Logger,
): Promise<express.Express> => {
  setStartTime();
  const app = express();

  app.use(express.json());
  app.set("json spaces", 4); // Mimic real api with correct formatting

  if (log) {
    app.use(
      pinoHttp({
        logger: log,
      }),
    );
  }

  app.use("/", express.static("static"));

  // Initialize OpenAPI-Backend
  const api = new OpenAPIBackend({
    definition: process.env["SPEC_FILE"] ?? "./specs/moddedccapi_20240906.json",
    strict: false,
    customizeAjv: (ajv) => {
      addFormats(ajv, {
        mode: "fast",
        formats: [
          "email",
          "uri",
          "url",
          "date-time",
          "uuid",
          "ipv4",
          "ipv6",
          "iso-date-time",
          "date",
          "int32",
        ],
      });
      ajv.addFormat("ObjectId", /^[a-f\d]{24}$/i);
      ajv.addFormat(
        "hostname",
        /^(?!:\/\/)([a-zA-Z\d-]{1,63})\.([a-zA-Z]{2,63})(\.[a-zA-Z]{2,63})?$/gm,
      );
      ajv.addFormat("JSON", {
        type: "string",
        validate: (x) => {
          try {
            return typeof JSON.parse(x) == "object";
          } catch {
            return false;
          }
        },
      });
      ajv.addFormat(
        "datetime (YYYY-MM-DDTHH:mm:ss.sssZ)",
        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/i,
      );
      return ajv;
    },
    handlers: {
      validationFail: async (c, req: ExpressReq, res: ExpressRes) => {
        return res.status(400).json({ err: c.validation.errors });
      },
      notFound: async (c, req: ExpressReq, res: ExpressRes) => {
        return res.status(404).json({ err: "not found" });
      },
      notImplemented: async (c, req: ExpressReq, res: ExpressRes) => {
        const { status, mock } = c.operation.operationId
          ? (c.api.mockResponseForOperation(c.operation.operationId) as {
              status: number;
              mock: object;
            })
          : { status: 500, mock: {} };
        return res.status(status).json(mock);
      },
    },
  });

  /*
   * This is an example of how to add an operation-specific implementation that will override
   * the mock behavior of OpenApiBackend. This Heartbeat response is mimicing the actual
   * returned data from the live endpoint.
   */
  api.register({
    Heartbeat: heartbeat,
  });

  await api.init();

  app.use((req, res, next) => {
    void api
      .handleRequest(req as Request, req, res)
      .then(() => {
        next();
      })
      .catch((e: unknown) => {
        next(e);
      });
  });

  return app;
};
