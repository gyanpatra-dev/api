import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient()

export const getusers = async(req:Request,res: Response)=>{

    const users  = await prisma.user.findMany({
        select:{
            email: true,
            name: true,
            branch:true,
            role:true,
        }
    })

    if(!users){
        res.json({
            message: "Users Not Found"

        })
        return ;
    }

    res.json({
        users:users
    })
        
}

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