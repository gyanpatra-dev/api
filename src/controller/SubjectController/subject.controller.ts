import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { record } from "zod";
import axios from "axios";

const prisma = new PrismaClient();

export const getsubjects = async (req: Request, res: Response) => {
  const { yearId, branchname } = req.body;

  if (!yearId || !branchname || yearId === "" || branchname === "") {
    res.status(400).json({
      message: "All Fields Are Required",
    });
    return;
  }

  try {
    const requireddata = await prisma.subject.findMany({
      where: {
        yearId,
        branchname,
      },
    });

    res.status(200).json({
      subjects: requireddata,
    });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({
      error: "Failed to fetch subjects",
    });
  }
};

export const getSubjectsByYear = async (req: Request, res: Response) => {
  const { branchid, yearid } = req.params;

  const parsedYearId = Number(yearid);
  const parsedBranchId = Number(branchid);

  // Check for NaN and ensure both are valid numbers
  if (isNaN(parsedYearId) || isNaN(parsedBranchId)) {
    res.status(400).json({
      message: "All fields are required and must be valid numbers.",
    });
    return;
  }

  try {
    const subjects = await prisma.subject.findMany({
      where: {
        yearId: parsedYearId,
        branchid: parsedBranchId,
      },
    });

    if (!subjects || subjects.length === 0) {
      res.status(404).json({
        message: "No subjects found",
      });
      return;
    }

    res.status(200).json({ subjects });
  } catch (error) {
    console.error("Error fetching subjects:", error);
    res.status(500).json({
      message: "An error occurred while fetching subjects.",
    });
  }
};

export const createSubject = async (req: Request, res: Response) => {
  const { yearId, subjectname, branchname, branchid } = req.body;

  if (
    !yearId ||
    !subjectname ||
    !branchname ||
    yearId === "" ||
    subjectname === "" ||
    branchname === ""
  ) {
    res.json({
      message: " Al Fields Are Required",
    });
    return;
  }
  const issubjectexist = await prisma.subject.findMany({
    where: {
      subjectname: subjectname,
      yearId,
    },
  });
  if (issubjectexist.length > 0) {
    res.status(400).json({
      message: "Subject Already Exists",
    });
    return;
  }

  try {
    const newsubject = await prisma.subject.create({
      data: {
        yearId,
        subjectname,
        branchname,
        branchid,
      },
    });

    res.json({
      message: "Subject Created Successfully",
      newsubject,
    });
  } catch (error) {
    message: "Filed";
    error;
    return;
  }
};

export const createSubjectMany = async (req: Request, res: Response) => {
  const subjects = req.body; // Expecting an array of objects

  // Validate the input
  if (!Array.isArray(subjects) || subjects.length === 0) {
    res.status(400).json({
      message: "At least one subject is required",
    });
    return;
  }

  for (const subject of subjects) {
    const { yearId, subjectname, branchname, branchid } = subject;

    if (
      !yearId ||
      !subjectname ||
      !branchname ||
      !branchid ||
      subjectname === "" ||
      branchname === ""
    ) {
      res.status(400).json({
        message: "All fields are required for each subject",
      });
      return;
    }
  }

  try {
    // Insert multiple subjects
    const newSubjects = await prisma.subject.createMany({
      data: subjects,
    });

    res.status(201).json({
      message: "Subjects created successfully",
      count: newSubjects.count, // Number of subjects created
    });
  } catch (error) {
    console.error("Error creating subjects:", error);
    res.status(500).json({
      message: "Failed to create subjects",
      error,
    });
  }
};

export const getCommonsubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await prisma.subject.findMany({
      where: {
        iscommon: true,
      },
    });
    if (!subjects) {
      res.status(400).json({
        message: "No Subjects Found",
      });
      return;
    }
    res.json({
      subjects,
    });
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message:err.message
    })
  }
};


export const getallsubjects = async(req:Request, res:Response)=>{
  try {
    const subjects = await prisma.subject.findMany({
      select:{
        subject_id:true,
        subjectname:true
      }
    })
    if(subjects.length===0){
      res.status(400).json({
        message: "No Subjects Found",
      });
      return;
    }
    res.json({
      subjects,
    });
  } catch (error) {
    error
    
  }
}


export const getSubjectsByYearId = async(req: Request,res: Response)=>{
  const {yearid} = req.params
  if(!yearid?.trim()){
    res.status(404).json({
      message: "All fields are required"
    })
    return
  }
  
  const parsedYearId = parseInt(yearid)
  try {
    const subjects = await prisma.subject.findMany({
      where:{
        yearId:parsedYearId
      }
    })
    if(!subjects || subjects.length === 0){
      res.status(400).json({
        message: "No subjects found"

      })
      return
    }
    res.status(200).json({
      message: "Subjects found successfully",
      subjects
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message: "Internal server errror",
      errror:err.message
    })
  }
}