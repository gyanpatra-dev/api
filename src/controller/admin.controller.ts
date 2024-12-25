import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()


export const getadmins = async(req: Request,res: Response)=>{
    const admins = prisma.user.findMany({
        where:{
            role:"ADMIN"
        }
    })
    res.status(200).json({
        admins:admins

    })
}