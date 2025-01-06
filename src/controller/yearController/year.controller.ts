import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { string } from "zod";



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
interface year{
    branchId:number;
    yearName:string
}
export const createYear = async (req: Request, res: Response) => {
    const { branchId, yearName }: year = req.body;

    const branchid = Number(branchId);
    if (!branchid || !yearName || yearName.trim() === "") {
        res.status(400).json({
            message: "All Fields Are Required"
        });
        return;
    }

    try {
       

        const newYear = await prisma.year.create({
            data: {
                branchId: branchid,
                yearName: yearName
            }
        });

        res.status(201).json({
            message: "Year Created Successfully",
            newYear
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the year",
            
        });
    }
};