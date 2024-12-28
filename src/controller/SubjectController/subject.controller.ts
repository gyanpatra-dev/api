import {  Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma  = new PrismaClient();

export const getsubjects = async (req: Request, res: Response) => {
    const { yearId, branchname } = req.body;

    // Validation
    if (!yearId || !branchname || yearId === "" || branchname === "") {
        res.status(400).json({
            message: "All Fields Are Required",
        });
        return; // Prevent further execution
    }

    try {
        // Fetch subjects from the database
        const requireddata = await prisma.subject.findMany({
            where: {
                yearId,
                branchname,
            },
        });

        // Send the response
        res.status(200).json({
            subjects: requireddata,
        });
    } catch (error) {
        console.error("Error fetching subjects:", error);
        res.status(500).json({
            error: "Failed to fetch subjects",
        });
    }
};


export const createSubject = async(req:Request, res: Response)=>{
    const{yearId,subjectname,branchname}=  req.body

    if(!yearId || !subjectname || !branchname || yearId ==="" ||subjectname===""||branchname==="" ){
        res.json({
            message: " Al Fields Are Required"
        })
        return;
    }

    try {
        const newsubject = await prisma.subject.create({
            data:{
                yearId,                
                subjectname,
                branchname
            }
        })

        res.json({
            message: "Subject Created Successfully",
            newsubject

        })
    } catch (error) {
        message: "Filed"
        error
        return
        
    }

}



export const createSubjectMany = async (req: Request, res: Response) => {
    const subjects = req.body; // Expecting an array of objects

    // Validate the input
    if (!Array.isArray(subjects) || subjects.length === 0) {
        res.status(400).json({
            message: "At least one subject is required",
        });
        return;
    }

    for (const subject of subjects) {
        const { yearId, subjectname, branchname } = subject;

        if (!yearId || !subjectname || !branchname || subjectname === "" || branchname === "") {
            res.status(400).json({
                message: "All fields are required for each subject",
            });
            return;
        }
    }

    try {
        // Insert multiple subjects
        const newSubjects = await prisma.subject.createMany({
            data: subjects,
        });

        res.status(201).json({
            message: "Subjects created successfully",
            count: newSubjects.count, // Number of subjects created
        });
    } catch (error) {
        console.error("Error creating subjects:", error);
        res.status(500).json({
            message: "Failed to create subjects",
            error,
        });
    }
};
