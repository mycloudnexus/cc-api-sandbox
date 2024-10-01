import request from "supertest";
import { createApp } from "../app";
import express from "express";

describe("the sandbox api server", () => {
  let app: express.Express;

  beforeAll(async () => {
    app = await createApp();
  });

  it("should return the heartbeat with the right fields", async () => {
    const result = await request(app).get("/heartbeat");

    expect(result.status).toBe(200);
    const data = result.body;
    expect(typeof data).toBe("object");
    if (typeof data != "object") return;

    expect(data).toHaveProperty("name");
    expect(data).toHaveProperty("now");
    expect(data).toHaveProperty("uptime");
    expect(data).toHaveProperty("humanUptime");
    expect(data).toHaveProperty("uptimeSeconds");
    expect(data).toHaveProperty("version");
  });
});
