import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createpyq = async (req: Request, res: Response) => {
  const { subjectId, links } = req.body;
  if (!subjectId || !links || links === "" || subjectId === "") {
    res.json({
      message: "All Fields Are Required",
    });
    return;
  }

  try {
    const newpyq = await prisma.pyq.create({
      data: {
        subjectId,
        links,
      },
    });
    res.json({
      pyq: newpyq,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};

export const getpyq = async (req: Request, res: Response) => {
  const { subject_id } = req.params;
  const parsedSubjectid = parseInt(subject_id);
  if (!parsedSubjectid) {
    res.json({
      message: "All Fields Are Required",
    });
    return;
  }
  try {
    const requireddata = await prisma.pyq.findMany({
      where: {
        subjectId: parsedSubjectid,
      },
    });
    if (!requireddata) {
      res.status(404).json({
        message: "Nothing Found",
      });
      return;
    }
    res.json({
      pyq: requireddata,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
};
