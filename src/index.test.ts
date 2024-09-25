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

import { spawn, ChildProcess } from "child_process";
import axios, { AxiosInstance } from "axios";
import waitOn from "wait-on";

jest.setTimeout(15000);

describe("the sandbox api server", () => {
  let start: ChildProcess;
  let client: AxiosInstance;

  beforeAll(() => {
    client = axios.create({
      baseURL: "http://localhost:9000",
      validateStatus: () => true,
      headers: { "Content-Type": "application/json" },
    });
    start = spawn("yarn", ["start"], {
      cwd: __dirname,
      detached: true,
      stdio: "inherit",
    });
  });

  afterAll(() => {
    if (start.pid) {
      process.kill(-start.pid);
    }
  });

  beforeEach(async () => {
    // Need to wait for the port to free up, otherwise every other test fails wtih "socket hang up".
    // In theory, should just have to do a waitOn in the beforeAll statement, but something's holding on to the socket?
    // TODO: Find out why.
    await waitOn({ resources: ["tcp:localhost:9000"] });
  });

  it("should return the heartbeat", async () => {
    const res = await client.get("/heartbeat");
    expect(res.status).toBe(200);
  });

  it("should return a 404 if called with a bad URI", async () => {
    const res = await client.get("/notarealpathatall");
    expect(res.status).toBe(404);
    expect(res.data).toEqual({ err: "not found" });
  });

  it("should return a 400 when called with a good URI and bad data", async () => {
    const res = await client.post("/app-user/company1/l3vpns");
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
    const res = await client.post("/app-user/company1/l3vpns", testData);
    expect(res.status).toBe(200);
    expect(res.data).toEqual({
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
