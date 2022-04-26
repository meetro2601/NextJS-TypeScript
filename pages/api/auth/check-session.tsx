import { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"

const handler = async (req:NextApiRequest,res:NextApiResponse) => {
    const session = await getSession({req})
    if(!session){
        return res.status(401).json({error:"UnAuthorized User"})
    }else{
        res.status(200).json({message:"Authorized User",session})
    }
}

export default handler