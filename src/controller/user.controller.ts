
import { Request, Response } from "express"

export const hello = (req:Request,res: Response)=>{
        res.json({
            message: "Hello From Controller"
        })
}