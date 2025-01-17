import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createnotes = async (req: Request, res: Response) => {
  const { subjectId, link,notesname } = req.body;
  if (!subjectId || !link ||!notesname || subjectId === "" || link === ""||notesname ==="") {
    res.json({
      message: "All Fields Are Required",
    });
    return;
  }

  try {
    const notes = await prisma.notes.create({
      data: {
        subjectId,
        link,
        notesname
      },
    });

    res.json({
      notes: notes,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

export const getnotes = async (req: Request, res: Response) => {
  const { subjectId } = req.body;

  try {
    const notes = await prisma.notes.findMany({
        where: {
          subjectId,
        },
        select: {
          notes_id: true,
          subjectId: true,
          link: true,
        },
      });

      if (!notes || notes.length === 0) {
        res.json({
          message: "No Notes Found",
        });
        return;
      }
      res.json({
        notes: notes
      })
  } catch (error) {
    res.json({
        message: error
    })
    
  }
};

export const getnotesbysubjectid = async (req: Request, res: Response) => {
  const {subjectId}  = req.params;
  const parsedSubjectid = parseInt(subjectId)
  if(!subjectId || subjectId === ""){
    res.json({
      message: "All Fields Are Required",
    });
    return;
  }
  try {
    const notes = await prisma.notes.findMany({
      where:{
        subjectId:parsedSubjectid
      },
      select:{
        notes_id:true,
        subjectId:true,
        link:true, 
        notesname:true
      }
    })
    if(!notes || notes.length === 0){
      res.status(404).json({
        message: "No Notes Found (get notes by id)",
      });
      return;
    }
    res.json({
      notes
    })
    
  } catch (error) {
    res.json({
      message: error
    })
    
  }


}

export const getnotesbyid = async(req:Request,res:Response)=>{
  const {notes_id} = req.params
  const parsedNotesid = parseInt(notes_id)
  if(!notes_id || notes_id === ""){
    res.json({
      message: "All Fields Are Required",
    });
    return;
  }
  try {
    const note = await prisma.notes.findFirst({
      where:{
        notes_id:parsedNotesid
      }
    })
    if(!note){
      res.status(404).json({
        message: "No Notes Found (get notes by id)",
      });
      return;
    }
    res.json({
      note
    })
    
  } catch (error) {
    
  }
}
