import { Router } from "express";
import { createpyq, getpyq,createmanypyq, getPyqById, getallpyq } from "../../controller/PyqController/pyq.controller";
const pyqrouter = Router()



pyqrouter.post("/create",createpyq);
pyqrouter.post("/createmany",createmanypyq);
pyqrouter.get("/",getallpyq)

pyqrouter.get("/:subject_id",getpyq);
pyqrouter.get("/id/:pyqid",getPyqById);



export default pyqrouter;