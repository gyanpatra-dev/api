import { Router } from "express";
import { createSubject, createSubjectMany, getsubjects } from "../../controller/SubjectController/subject.controller";
const subjectrouter = Router();


subjectrouter.get("");
subjectrouter.post("/create",createSubject);
subjectrouter.post("/createmany",createSubjectMany);
subjectrouter.get("/data",getsubjects)



export default subjectrouter;