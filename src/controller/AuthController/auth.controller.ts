// imports
require("dotenv").config();
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { omit} from "lodash";

const JWT_USER_SECRET =
  process.env.JWT_USER_SECRET || "oweqvoqv brluigreuibvuib2ruib";

// instances

const prisma = new PrismaClient()

// controllers

export const signup = async (req: Request, res: Response):Promise<any> => {
  const requiredbody = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(20),
    name: z.string(),
    branch: z.enum([
      "CSE",
      "IT",
      "EE",
      "ETC",
      "EEE",
      "PE",
      "CHE",
      "CE",
      "MME",
      "ME",
    ]),
    // semester: z.string(),
    role: z.enum(["USER", "ADMIN"]),
  });

  const parseddata = requiredbody.safeParse(req.body);
  console.log(req.body)
  console.log(parseddata)
  if (!parseddata.success) {
     res.status(400).json({
      message: "Bad Request Incorrect Input Format",
      error: parseddata.error,
    });
    return 
  }

  const { email, password, name, branch, semester } = req.body;
  try {
    const existinguser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existinguser) {
        res.status(409).json({
        message: "Email Is Already Regestered",
      });
      return ;
    }

    
    const hashedpassword = await bcrypt.hash(password, 10);
    console.log(hashedpassword)
    const newuser = await prisma.user.create({
     
      data: {
        email,
        password: hashedpassword,
        name,
        // branch,
        // semester,
      },
      
    });

    console.log(newuser)

    const token = jwt.sign({ userId: newuser.user_id }, JWT_USER_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User Successfully Created",
      newuser: omit(newuser, ["password"]),
      token
    });
    return  null;
  } catch (error) {
     res.status(501).json({
      message: "Error While Signing Up",
      err: error,
    });
    return 
  }
};

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      message: "All fields are required."
    });
    return ;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
       res.status(404).json({
        message: "User not found. Try signing up."
      });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      res.status(401).json({
        message: "Incorrect password."
      });
      return;
    }

    const token = jwt.sign({ userId: user.user_id }, JWT_USER_SECRET, { expiresIn: "1h" });
    res.status(200).json({
      message: "User signed in successfully.",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "An error occurred while signing in.",
      error
    });
  }
};
