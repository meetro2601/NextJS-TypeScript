import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import clientPromise from 'lib/mongoDB-connect'

import { JWT } from 'next-auth/jwt'

interface token extends JWT {
    id?: string | undefined 
} 

export default NextAuth({
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    adapter: MongoDBAdapter(clientPromise),
    session:{
        strategy:"jwt"
    },
    callbacks:{
        async jwt({token,user}){
            if(user){
                token.id = user.id
            }
            return token
        },
        async session({session,token}){
            session.user.id = (token as token).id
                return session
        }
    }
})