import { Router } from "express";
import { createyear } from "../../controller/yearController/year.controller";
const yearrouter = Router()

yearrouter.get("/",);
yearrouter.post("/create",createyear)


export default yearrouter;