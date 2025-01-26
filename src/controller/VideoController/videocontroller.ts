import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getvideos = async (req: Request, res: Response) => {
  try {
    const allvideoslinks = await prisma.youtubeLinks.findMany({
      select: {
        video_id: true,
        link: true,
        videoname: true,
        subjectId: true,
      },
    });
    if (!allvideoslinks || allvideoslinks.length === 0) {
      res.status(400).json({
        message: "No Videos Found",
      });
      return;
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: err.message,
    });
    return;
  }
};

export const createvideolink = async (req: Request, res: Response) => {
  const { subjectId, link, videoname } = req.body;
  if (
    !subjectId ||
    !link ||
    !videoname ||
    subjectId === "" ||
    link === "" ||
    videoname === ""
  ) {
    res.status(400).json({
      message: "All Fields Are Required",
    });
    return;
  }
  const parsedsubjectid = parseInt(subjectId);
  try {
    const videolink = await prisma.youtubeLinks.create({
      data: {
        subjectId: parsedsubjectid,
        link,
        videoname,
      },
    });
    if (!videolink) {
      res.status(400).json({
        message: "Video link not created",
      });
      return;
    }
    res.status(200).json({
      message: "Video Link Created",
      videolink,
    });
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      message: err.message,
    });
    return;
  }
};

export const getvideolinksbysubjectid = async(req:Request,res:Response)=>{
    const subjectId = req.params.subjectId;
    if(!subjectId ){
        res.status(400).json({message:"Subject Id is Required"});
        return;
    }
    const parsedsubjectid = parseInt(subjectId);
    try {
        const videolinks = await prisma.youtubeLinks.findMany({
            where:{
                subjectId:parsedsubjectid
            },
            select:{
                subjectId:true,
                link:true,
                videoname:true
            }
        })
        if(!videolinks || videolinks.length === 0){
            res.json({message:"No Video Links Found"});
            return;
        }
        res.json({videolinks});
        
    } catch (error) {
        const err = error as Error;
        res.status(400).json({
            message: err.message,
        });
        return;
    }
}