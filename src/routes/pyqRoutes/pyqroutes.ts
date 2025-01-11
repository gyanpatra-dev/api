import { Router } from "express";
import { createpyq, getpyq } from "../../controller/PyqController/pyq.controller";
const pyqrouter = Router()



pyqrouter.post("/create",createpyq);
pyqrouter.get("/:subject_id",getpyq)



export default pyqrouter;