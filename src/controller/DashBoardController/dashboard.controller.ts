import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma  = new PrismaClient()


export const getAnalytics = async(req: Request,res: Response)=>{
    try {
        const totalPyqs = await prisma.pyq.count()
        const totalNotes = await prisma.notes.count()
        const totalYoutubeLinks = await prisma.youtubeLinks.count()

        if(!totalNotes||!totalPyqs||!totalYoutubeLinks){
            res.status(500).json({
                message: "Something went wrong"
            });
            return
        }
        res.status(200).json({
            message: "Successfully fetched analytics",
            pyqs:totalPyqs,
            notes:totalNotes,
            youtubeLinks:totalYoutubeLinks
        })

        
    } catch (error) {
        const err = error as Error
        res.status(500).json({
            message: err.message
        })
    }
}