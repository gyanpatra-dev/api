import { Request, Response } from 'express'




export const signup = (req: Request,res: Response)=>{
    res.json({
        message: "Hi From Signup Controller"
    })

}


export const signin = (req: Request,res: Response)=>{
    res.json({
        message: "Hi From SignIn Controller"
    })

}