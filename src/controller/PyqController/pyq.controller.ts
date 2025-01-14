import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createpyq = async (req: Request, res: Response) => {
  const { subjectId, links, pyqname,pyqyear } = req.body;
  if (
    !subjectId ||
    !pyqname ||
    !links ||
    !pyqyear||
    links === "" ||
    subjectId === "" ||
    pyqname === ""||
    pyqyear ===""
  ) {
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
        pyqname,
        pyqyear,
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


export const createmanypyq = async (req: Request, res: Response) => {
  const { pyqs } = req.body;

  if (!Array.isArray(pyqs) || pyqs.length === 0) {
    res.status(406).json({
      message: "At least one pyq is required"
    });
    return;
  }

  // Filter out invalid pyqs
  const validPyqs = pyqs.filter(pyq => {
    const { subjectId, pyqname, links,pyqtype,pyqyear } = pyq;
    return subjectId && pyqname && links && pyqname.trim() && links.trim() && pyqtype.trim() && pyqyear.trim();
  });

  if (validPyqs.length === 0) {
    res.status(406).json({
      message: "All fields are required for each pyq"
    });
    return;
  }

  try {
    const createdPyqs = await prisma.pyq.createMany({
      data: validPyqs
    });

    res.status(201).json({
      message: `${createdPyqs.count} pyqs created`
    });
  } catch (error) {
    console.error("Error creating pyqs:", error);
    res.status(500).json({
      message: "An error occurred while creating pyqs"
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
      select:{
        links:true,
        subjectId:true,
        pyqtype:true,
        pyq_id:true,
        pyqname:true,
        subject:true
      }
    });

    if (requireddata.length === 0) {
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


export const getPyqById = async (req: Request, res: Response) => {
  try {
    const { pyqid } = req.params;
    const parsedId = parseInt(pyqid);

    if (isNaN(parsedId)) {
     res.status(400).json({ error: 'Invalid PYQ ID format' });
     return ;
    }

    const data = await prisma.pyq.findUnique({
      where: { pyq_id: parsedId }, // Assuming 'id' is the column name
    });

    if (!data) {
   res.status(404).json({ error: 'PYQ not found' });
   return ;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const getallpyq = async(res:Response)=>{
  try {
    const allpyqs = await prisma.pyq.findMany();
    if(!allpyqs){
      res.status(404).json({
        message: "Nothing found"
      })
      return;
    }
    res.json(allpyqs)
    
  } catch (error) {
    error
    return
  }
}