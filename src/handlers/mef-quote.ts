import { Context } from "openapi-backend";
import { Request, Response } from "express";

const UNI_TYPE = "UNI";
const ELINE_TYPE = "ACCESS_E_LINE";
const ADD_ACTION = "add";
type QuotePayload = {
  instantSyncQuote: boolean;
  quoteItem: [
    {
      product: {
        productConfiguration: {
          "@type": string;
        };
      };
      action: string;
    },
  ];
};
export function createQuote(_c: Context, _req: Request, res: Response) {
  try {
    const quoteRequest = _req.body as QuotePayload;
    const quoteItem = quoteRequest["quoteItem"][0];
    const action = quoteItem.action;
    const type = quoteItem.product.productConfiguration["@type"];
    const syncQuote = quoteRequest.instantSyncQuote;
    if (syncQuote && action === ADD_ACTION) {
      if (type === UNI_TYPE) {
        return mockResponseForSpecifiedCase(_c, res, "UNI-Quote");
      } else if (type === ELINE_TYPE) {
        return mockResponseForSpecifiedCase(_c, res, "Eline-Quote");
      }
    }
    return mock400Response(res);
  } catch (e) {
    const err = e as Error;
    return mock400Response(res, err.message);
  }
}

function mockResponseForSpecifiedCase(
  _c: Context,
  res: Response,
  example: string,
) {
  const mockData = _c.api.mockResponseForOperation("createQuote", {
    code: 201,
    example: example,
  });
  return res.status(mockData.status).json(mockData.mock);
}

function mock400Response(res: Response, reason?: string) {
  return res.status(422).json({
    code: "invalidBody",
    reason: reason ?? "api use case is not supported",
    message: "api use case is not supported",
  });
}
