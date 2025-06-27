import { createApp } from "../app";
import request from "supertest";
import express from "express";

describe("request to mef order api", () => {
  let app: express.Express;

  beforeAll(async () => {
    process.env["SPEC_FILE"] = "./specs/mef-api.json";
    process.env["QUICK"] = "true";
    app = await createApp();
  });

  it("should return create UNI order example", async () => {
    const requestBody = {
      productOrderItem: [
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
      .post("/mefApi/sonata/productOrderingManagement/v10/productOrder")
      .send(requestBody);
    expect(result.status).toBe(201);
    const data = result.body;
    expect(data.productOrderItem).toHaveLength(1);
    expect(data.productOrderItem[0].action).toBe("add");
    expect(
      data.productOrderItem[0]["product"]["productConfiguration"]["@type"],
    ).toBe("UNI");
  });

  it("should return create Eline order example", async () => {
    const requestBody = {
      productOrderItem: [
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
      .post("/mefApi/sonata/productOrderingManagement/v10/productOrder")
      .send(requestBody);
    expect(result.status).toBe(201);
    const data = result.body;
    expect(data.productOrderItem).toHaveLength(1);
    expect(data.productOrderItem[0].action).toBe("add");
    expect(
      data.productOrderItem[0]["product"]["productConfiguration"]["@type"],
    ).toBe("ACCESS_E_LINE");
  });

  it("should return 422 example", async () => {
    const requestBody = {
      productOrderItem: [
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
      .post("/mefApi/sonata/productOrderingManagement/v10/productOrder")
      .send(requestBody);
    expect(result.status).toBe(422);
  });
});
