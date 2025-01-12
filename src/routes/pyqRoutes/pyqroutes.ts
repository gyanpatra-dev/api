import { Router } from "express";
import { createpyq, getpyq,createmanypyq } from "../../controller/PyqController/pyq.controller";
const pyqrouter = Router()



pyqrouter.post("/create",createpyq);
pyqrouter.post("/createmany",createmanypyq);
pyqrouter.get("/:subject_id",getpyq)



export default pyqrouter;