import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
    req:NextApiRequest,
    res:NextApiResponse<string | string[]>,
){
    const {filters} = req.query
    res.status(200).json(filters)
}