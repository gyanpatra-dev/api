import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const getusers = async(req:Request,res: Response)=>{

    const users  = await prisma.user.findFirst({
        select:{
            email: true,
            name: true
        }
    })

    res.json({
        users:users
    })
        
}