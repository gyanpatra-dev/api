import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getallbranch = async (req: Request, res: Response) => {
  try {
    const branches = await prisma.branch.findMany();
    if (!branches) {
      res.json({
        message: "No Branch Found !",
      });
    }
    res.json({
      branches: branches,
      message: "Branch Fetched Successfully",
    });
  } catch (error) {
    res.json({
      error,
    });
  }
};

export const createbranch = async (req: Request, res: Response) => {
  const { branchname, displayimage } = req.body;

  if (
    !branchname ||
    !displayimage ||
    branchname === "" ||
    displayimage === ""
  ) {
    res.json({
      message: " All fields are required",
    });
    return;
  }
  const isbranchexist = await prisma.branch.findUnique({
    where:{
      branchname
    }
  })

  if(isbranchexist){
    res.status(400).json({
      message: "Branch Already Exists",
    })
    return ;
  }

  try {
    const newbranch = await prisma.branch.create({
      data: {
        branchname,
        displayimage,
        
      },
    });
    if (newbranch) {
      res.json({
        newbranch: newbranch,
      });
    }
  } catch (error) {
    res.status(200).json({
      error: error,
    });
    console.log(error);
    return;
  }
};

interface updateifo {
  branchimage: string;
  displayimage: string;
  branchname: string;
}

export const updatebranch = async (req: Request, res: Response) => {
  const { branchimage, displayimage, branchname }: updateifo = req.body;
  if (
    !branchname ||
    !branchimage ||
    !displayimage ||
    branchname === "" ||
    displayimage === "" ||
    branchimage === ""
  ) {
    res.json({
      message: "ALL Fields Are Required",
    });
    return;
  }
  try {
    const updatedbranch = await prisma.branch.update({
      where: {
        branchname,
      },
      data: {
        
        displayimage,
      },
    });
    res.json({
      updatedBranch: updatedbranch,
    });
  } catch (error) {
    res.json({
      err: error,
    });
    return;
  }
};
