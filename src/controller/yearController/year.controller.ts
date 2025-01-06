import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";



// instances
const prisma = new PrismaClient();


export const getallyear = async(req: Request,res: Response)=>{
    const{branchId} = req.params
    const branchid = Number(branchId)
    if(!branchid){
         res.status(400).json({
            message: "All Fields Are Required"
        })
        return;
    }
    try {
        const requiredyear = await prisma.year.findMany({
            where:{
                branchId: branchid
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


// export const createyear = async(req: Request,res: Response)=>{
//     const{branchId} = req.params
//     const branchid = Number(branchId)
//     if(!branchid){
//          res.status(400).json({
//             message: "All Fields Are Required"
//         })
//         return;
//     }
//     try {
//         const newyear = await prisma.year.create({
//             data:{
//                 branchId:branchid
                
//             }
//         })
//         res.json({
//             message: "Year Created Successfully",
//             newyear
//         })
//     } catch (error) {
//         message:error
//     }

// }