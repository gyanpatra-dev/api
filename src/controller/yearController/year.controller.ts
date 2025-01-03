import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



// instances
const prisma = new PrismaClient();


export const getallyear = async(req: Request,res: Response)=>{
    const{branchId} = req.body
    if(!branchId || branchId ===""){
        res.json({
            message: "All Fields Are Required"
        })
    }
    try {
        const requiredyear = await prisma.year.findMany({
            where:{
                branchId
            }
        })

        res.json({
            requiredyear
        })
    } catch (error) {
        message: "Not Found"
        err:error
    }
}


export const createyear = async(req: Request,res: Response)=>{
    const {branchId} = req.body

    if(!branchId || branchId === ""){
        res.json({
            message: "All Fields Are Required"
        })
    }

    try {
        const newyear = await prisma.year.create({
            data:{
                branchId,
                
            }
        })
        res.json({
            message: "Year Created Successfully",
            newyear
        })
    } catch (error) {
        message:error
    }

}