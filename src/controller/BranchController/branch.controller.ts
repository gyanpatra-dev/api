import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getallbranch = async(req: Request, res: Response) => {
  try {
    const branches  = await prisma.branch.findMany();
    if(!branches){
      res.json({
        message: "No Branch Found !"
      })
    }
    res.json({
      branches:branches,
      message: "Branch Fetched Successfully"
    })
  } catch (error) {
    res.json({
      error
    })
    
  }
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




interface updateifo{
    branchimage:string,
    displayimage:string,
    branchname:string

}



export const updatebranch = async(req: Request,res: Response)=>{
    const{branchimage,displayimage,branchname}:updateifo=req.body
    if(!branchname || ! branchimage || ! displayimage || branchname ==="" || displayimage ===""|| branchimage===""){
        res.json({
            message: "ALL Fields Are Required"
        })
        return ;
    }
    try {
        const updatedbranch  = await prisma.branch.update({
            where:{
                branchname
            },
            data:{
                branchimage,
                displayimage
            }
        })
        res.json({
            updatedBranch: updatedbranch
        })
    } catch (error) {
        res.json({
            err: error
        })
        return ;
    }


}