import { Router } from "express";
import {getallyear } from "../../controller/yearController/year.controller";
const yearrouter = Router()

yearrouter.get("/:branchId",getallyear);
// yearrouter.post("/create",createyear)


export default yearrouter;