import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createpyq = async (req: Request, res: Response) => {
  try {
    const { subjectId, links, pyqname, pyqyear, pyqtype } = req.body;

    const parsedSubjectId = parseInt(subjectId);
    if (
      isNaN(parsedSubjectId) ||
      typeof links !== 'string' ||
      typeof pyqname !== 'string' ||
      typeof pyqyear !== 'string' ||
      (pyqtype && typeof pyqtype !== 'string')
    ) {
       res.status(400).json({ message: "Invalid input types or missing fields" });
       return
    }

    const newpyq = await prisma.pyq.create({
      data: {
        subjectId: parsedSubjectId,
        links: links.trim(),
        pyqname: pyqname.trim(),
        pyqyear: pyqyear.trim(),
        pyqtype: pyqtype?.trim() || undefined, // optional if you want to use default
      },
    });

    res.status(201).json({ pyq: newpyq });
  } catch (error: any) {
    console.error("Create PYQ Error:", error);
    res.status(500).json({
      message: error.message || "Server Error",
    });
  }
};


export const createmanypyq = async (req: Request, res: Response) => {
  const { pyqs } = req.body;

  if (!Array.isArray(pyqs) || pyqs.length === 0) {
    res.status(406).json({
      message: "At least one pyq is required",
    });
    return;
  }

  // Filter out invalid pyqs
  const validPyqs = pyqs.filter((pyq) => {
    const { subjectId, pyqname, links, pyqtype, pyqyear } = pyq;
    return (
      subjectId &&
      pyqname &&
      links &&
      pyqname.trim() &&
      links.trim() &&
      pyqtype.trim() &&
      pyqyear.trim()
    );
  });

  if (validPyqs.length === 0) {
    res.status(406).json({
      message: "All fields are required for each pyq",
    });
    return;
  }

  try {
    const createdPyqs = await prisma.pyq.createMany({
      data: validPyqs,
    });

    res.status(201).json({
      message: `${createdPyqs.count} pyqs created`,
    });
  } catch (error) {
    console.error("Error creating pyqs:", error);
    res.status(500).json({
      message: "An error occurred while creating pyqs",
    });
  }
};

export const getpyq = async (req: Request, res: Response) => {
  const { subject_id } = req.params;
  const parsedSubjectid = parseInt(subject_id);
  if (!parsedSubjectid) {
    res.json({
      message: "All Fields Are Required xx",
    });
    return;
  }
  try {
    const requireddata = await prisma.pyq.findMany({
      where: {
        subjectId: parsedSubjectid,
      },
      select: {
        links: true,
        subjectId: true,
        pyqtype: true,
        pyq_id: true,
        pyqname: true,
        subject: true,
      },
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
      res.status(400).json({ error: "Invalid PYQ ID format" });
      return;
    }

    const data = await prisma.pyq.findUnique({
      where: { pyq_id: parsedId }, // Assuming 'id' is the column name
    });

    if (!data) {
      res.status(404).json({ error: "PYQ not found" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getallpyq = async (req: Request, res: Response) => {
  try {
    const allpyqs = await prisma.pyq.findMany({
      select: {
        pyqname: true,
        pyq_id: true,
      },
    });
    if (!allpyqs) {
      res.json({
        message: "Nothing Found",
      });
    }
    res.json({
      allpyqs,
    });
  } catch (error) {
    console.error("Error fetching PYQs:", error);
  }
};
