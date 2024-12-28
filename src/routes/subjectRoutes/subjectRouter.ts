import { Router } from "express";
import { createSubject, createSubjectMany } from "../../controller/SubjectController/subject.controller";
const subjectrouter = Router();


subjectrouter.get("");
subjectrouter.post("/create",createSubject);
subjectrouter.post("/createmany",createSubjectMany);



export default subjectrouter;