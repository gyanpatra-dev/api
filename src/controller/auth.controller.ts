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

const prisma = new PrismaClient();

// controllers

export const signup = async (req: Request, res: Response) => {
  const requiredbody = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(10),
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
    semester: z.string(),
  });

  const parseddata = requiredbody.safeParse(req.body);
  if (!parseddata.success) {
    return res.status(400).json({
      message: "Bad Request Incorrect Input Format",
      error: parseddata.error,
    });
  }

  const { email, password, name, branch, semester } = req.body;
  try {
    const existinguser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existinguser) {
      return res.status(409).json({
        message: "Email Is Already Regestered",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = await prisma.user.create({
      data: {
        email,
        password: hashedpassword,
        name,
        branch,
        semester,
      },
    });

    const token = jwt.sign({ userId: newuser.user_id }, JWT_USER_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "User Successfully Created",
      newuser: omit(newuser, ["password"]),
      token
    });
  } catch (error) {
    return res.status(501).json({
      message: "Error While Signing Up",
      err: error,
    });
  }
};

export const signin = (req: Request, res: Response) => {
  res.json({
    message: "Hi From SignIn Controller",
  });
};
