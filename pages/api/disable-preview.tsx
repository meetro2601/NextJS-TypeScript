import { NextApiRequest, NextApiResponse } from "next";
type NextResponse = NextApiResponse & {
    redirect?: (url:string | string[])=>NextApiResponse
}

export default function handler(
    req:NextApiRequest,
    res: NextResponse
){
    res.clearPreviewData()
    res.redirect(req.query.redirect)
}