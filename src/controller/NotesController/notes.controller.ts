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
      res.json({
        notes: notes
      })
  } catch (error) {
    res.json({
        message: error
    })
    
  }
};
