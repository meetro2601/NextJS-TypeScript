import { NextApiRequest, NextApiResponse } from "next";
import { Data, DataObj } from ".";
import { products } from "../../../data/products";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataObj | Data | undefined>
) {
  const result: DataObj | undefined = products.find(
    (product) => product.name === req.query.name
  );

  if (result === undefined) {
    return res.status(404).json({ success: false });
  }

  if (req.method === "DELETE") {
    const index = products.findIndex(
      (product) => product.name === req.query.name
      );
      products.splice(index, 1);
      return res.status(200).json(products)
  }
  
  if (req.method === "PUT") {
    const index = products.findIndex(
      (product) => product.name === req.query.name
      );
      
      products.splice(index, 1,req.body);
      return res.status(200).json(products)
  }

  res.status(200).json(result);
}
