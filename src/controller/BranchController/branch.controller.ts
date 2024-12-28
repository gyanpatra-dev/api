import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getallbranch = (req: Request, res: Response) => {
  res.json({
    message: "Hello From Brach controller",
  });
};

export const createbranch = async (req: Request, res: Response) => {
  const { branchname, displayimage, branchimage } = req.body;
  if (
    !branchname ||
    !displayimage ||
    !branchimage ||
    branchname === "" ||
    branchimage === "" ||
    displayimage === ""
  ) {
    res.json({
      message: " All fields are required",
    });
    return;
  }
  try {
    const newbranch = await prisma.branch.create({
      data: {
        branchname,
        displayimage,
        branchimage,
      },
    });
    if (newbranch) {
      res.json({
        newbranch: newbranch,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
    console.log(error);
    return;
  }
};
