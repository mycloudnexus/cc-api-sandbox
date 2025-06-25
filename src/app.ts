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
import express from "express";
import pinoHttp from "pino-http";
import { Request as ExpressReq, Response as ExpressRes } from "express";
import { setStartTime, heartbeat } from "./handlers/heartbeat";
import pino from "pino";
import { createOrder } from "./handlers/mef-order";
import { createQuote } from "./handlers/mef-quote";

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

  // if QUICK is true, will skip the validation, default value is false
  const quick = process.env["QUICK"];
  const quickBool = !(quick === "true" || quick === "false")
    ? false
    : Boolean(quick);

  const api = new OpenAPIBackend({
    definition: process.env["SPEC_FILE"] ?? "./specs/moddedccapi_20240906.json",
    strict: false,
    quick: quickBool,
    handlers: {
      validationFail: async (c, req: ExpressReq, res: ExpressRes) =>
        res.status(400).json({ err: c.validation.errors }),
      notFound: async (c, req: ExpressReq, res: ExpressRes) =>
        res.status(404).json({ err: "not found" }),
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
    createProductOrder: createOrder,
    createQuote: createQuote,
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
