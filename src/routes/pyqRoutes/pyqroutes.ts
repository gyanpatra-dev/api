import { Router } from "express";
import { createpyq, getpyq } from "../../controller/PyqController/pyq.controller";
const pyqrouter = Router()



pyqrouter.post("/create",createpyq);
pyqrouter.get("/",getpyq)



export default pyqrouter;