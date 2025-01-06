import { Router } from "express";
import {getallyear,createYear } from "../../controller/yearController/year.controller";
const yearrouter = Router()

yearrouter.get("/:branchId",getallyear);
yearrouter.post("/create",createYear)


export default yearrouter;