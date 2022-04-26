// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { products } from '../../../data/products'

export type DataObj = {
  name?: string,
  price?: number,
  success?:boolean
}

export type Data = DataObj[]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if(req.method === 'POST'){
    products.push(req.body)
    return res.status(201).json(products)
  }
    res.status(200).json(products)
}
