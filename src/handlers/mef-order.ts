import { Context } from "openapi-backend";
import { Request, Response } from "express";

const UNI_TYPE = "UNI";
const ELINE_TYPE = "ACCESS_E_LINE";
const ADD_ACTION = "add";
const DELETE_ACTION = "delete";
type OrderPayload = {
  productOrderItem: [
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
export function createOrder(_c: Context, _req: Request, res: Response) {
  try {
    const requestPayload = _req.body as OrderPayload;
    const productItem = requestPayload["productOrderItem"][0];
    const action = productItem.action;
    const type = productItem.product.productConfiguration["@type"];
    if (action === ADD_ACTION && type === UNI_TYPE) {
      return mockResponseForSpecifiedCase(_c, res, "UNI-ADD-Order");
    } else if (action === ADD_ACTION && type === ELINE_TYPE) {
      return mockResponseForSpecifiedCase(_c, res, "Eline-ADD-Order");
    } else if (action === DELETE_ACTION && type === UNI_TYPE) {
      return mockResponseForSpecifiedCase(_c, res, "UNI-Delete-Order");
    } else if (action === DELETE_ACTION && type === ELINE_TYPE) {
      return mockResponseForSpecifiedCase(_c, res, "Eline-Delete-Order");
    } else {
      return mock400Response(res);
    }
  } catch (e) {
    return mock400Response(res);
  }
}

function mockResponseForSpecifiedCase(
  _c: Context,
  res: Response,
  example: string,
) {
  const mockData = _c.api.mockResponseForOperation("createProductOrder", {
    code: 201,
    example: example,
  });
  return res.status(mockData.status).json(mockData.mock);
}

function mock400Response(res: Response) {
  return res.status(422).json({
    code: "invalidBody",
    reason: "api use case is not supported",
    message: "api use case is not supported",
  });
}
