import express from "express";
import { createApp } from "../app";
import request from "supertest";

describe("request to mef quote api", () => {
  let app: express.Express;

  beforeAll(async () => {
    process.env["SPEC_FILE"] = "./specs/mef-api.json";
    process.env["QUICK"] = "true";
    app = await createApp();
  });

  it("should return create QUOTE order example", async () => {
    const requestBody = {
      instantSyncQuote: true,
      quoteItem: [
        {
          action: "add",
          product: {
            productConfiguration: {
              "@type": "UNI",
            },
          },
        },
      ],
    };
    const result = await request(app)
      .post("/mefApi/sonata/quoteManagement/v8/quote")
      .send(requestBody);
    expect(result.status).toBe(201);
    const data = result.body;
    expect(data.quoteItem).toHaveLength(1);
    expect(data.quoteItem[0].action).toBe("add");
    expect(data.quoteItem[0]["product"]["productConfiguration"]["@type"]).toBe(
      "UNI",
    );
  });

  it("should return create Eline order example", async () => {
    const requestBody = {
      instantSyncQuote: true,
      quoteItem: [
        {
          action: "add",
          product: {
            productConfiguration: {
              "@type": "ACCESS_E_LINE",
            },
          },
        },
      ],
    };
    const result = await request(app)
      .post("/mefApi/sonata/quoteManagement/v8/quote")
      .send(requestBody);
    expect(result.status).toBe(201);
    const data = result.body;
    expect(data.quoteItem).toHaveLength(1);
    expect(data.quoteItem[0].action).toBe("add");
    expect(data.quoteItem[0]["product"]["productConfiguration"]["@type"]).toBe(
      "ACCESS_E_LINE",
    );
  });

  it("should return 422 example if passing wrong type", async () => {
    const requestBody = {
      instantSyncQuote: true,
      quoteItem: [
        {
          action: "add",
          product: {
            productConfiguration: {
              "@type": "ELINE",
            },
          },
        },
      ],
    };
    const result = await request(app)
      .post("/mefApi/sonata/quoteManagement/v8/quote")
      .send(requestBody);
    expect(result.status).toBe(422);
  });
});
