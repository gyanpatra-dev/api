import { Router } from "express";
import { createyear, getallyear } from "../../controller/yearController/year.controller";
const yearrouter = Router()

yearrouter.get("/",getallyear);
yearrouter.post("/create",createyear)


export default yearrouter;