import { Request, Response } from "express"

export const  getallbranch = (req: Request,res: Response)=>{
    res.json({
        message: "Hello From Brach controller"
    })

}



export const createbranch = async(req: Request, res: Response)=>{
    const{}

}