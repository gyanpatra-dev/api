import { Router } from "express";
import {
  createSubject,
  createSubjectMany,
  getsubjects,
  getSubjectsByYear,
  getCommonsubjects,
  getallsubjects,
  getSubjectsByYearId,
} from "../../controller/SubjectController/subject.controller";
const subjectrouter = Router();

subjectrouter.get("/common", getCommonsubjects);
subjectrouter.get("/getall", getallsubjects);
subjectrouter.get("/data", getsubjects);
subjectrouter.post("/create", createSubject);
subjectrouter.post("/createmany", createSubjectMany);

// Dynamic routes come last
subjectrouter.get("/:branchid/:yearid", getSubjectsByYear);
subjectrouter.get("/:yearid", getSubjectsByYearId);
export default subjectrouter;
