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
interface Branch {
  branchname: string;
  displayimage: string;
  branchcode: string;
}
export const createbranch = async (req: Request, res: Response) => {
  const { branchname, displayimage, branchcode }: Branch = req.body;

  if (
    !branchcode ||
    !branchname ||
    !displayimage ||
    branchname === "" ||
    displayimage === "" ||
    branchcode === ""
  ) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  const isbranchexist = await prisma.branch.findUnique({
    where: { branchname },
  });

  if (isbranchexist) {
    res.status(400).json({ message: "Branch Already Exists" });
    return;
  }

  try {
    const newbranch = await prisma.branch.create({
      data: { branchname, displayimage, branchcode },
    });
    res.json({ newbranch });
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
};

export const createmanybranch = async (req: Request, res: Response) => {
  const branches: Branch[] = req.body;

  if (!Array.isArray(branches) || branches.length === 0) {
    res.status(400).json({ message: "Input must be an array of branches" });
    return;
  }

  for (const branch of branches) {
    const { branchname, displayimage, branchcode } = branch;

    if (!branchname || !displayimage || !branchcode || branchname === "" || displayimage === "" || branchcode === "") {
      res.status(400).json({ message: "All fields are required for each branch" });
      return;
    }

    const isbranchexist = await prisma.branch.findUnique({
      where: { branchname },
    });

    if (isbranchexist) {
      res.status(400).json({ message: `Branch ${branch.branchname} already exists` });
      return;
    }
  }

  try {
    const newbranches = await prisma.branch.createMany({ data: branches });
    res.json({ newbranches });
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
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
