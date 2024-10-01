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

import request from "supertest";
import { createApp } from "./app";
import express from "express";

describe("the sandbox api server", () => {
  let app: express.Express;

  beforeAll(async () => {
    app = await createApp();
  });

  it("should return the heartbeat", async () => {
    const res = await request(app).get("/heartbeat");
    expect(res.status).toBe(200);
  });

  it("should return a 404 if called with a bad URI", async () => {
    const res = await request(app).get("/notarealpathatall");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ err: "not found" });
  });

  it("should return a 400 when called with a good URI and bad data", async () => {
    const res = await request(app).post("/app-user/company1/l3vpns");
    expect(res.status).toBe(400);
  });

  it("should return the example for an unimplented URI with correct data", async () => {
    const testData = {
      name: "My CloudRouter",
      paymentMethod: "invoice",
      bandwidth: "500MB",
      duration: {
        quantity: 1,
        unit: "m",
      },
    };
    const res = await request(app)
      .post("/app-user/company1/l3vpns")
      .send(testData);
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      name: "My CloudRouter",
      status: "CREATING",
      id: "63e48134c3af0500151b59f3",
      paymentMethod: "invoice",
      duration: {
        quantity: 1,
        unit: "m",
      },
      bandwidth: "500MB",
      companyId: "5ea242303962644b52fc4346",
      deletedAt: null,
      createdAt: "2023-02-09T05:14:28.759Z",
      updatedAt: "2023-02-09T05:14:28.760Z",
    });
  });
});
