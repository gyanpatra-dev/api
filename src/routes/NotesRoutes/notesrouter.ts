import { Router } from "express";
import { createnotes, getnotes, getnotesbysubjectid } from "../../controller/NotesController/notes.controller";
const notesrouter = Router()

notesrouter.post("/create",createnotes)
notesrouter.get("/",getnotes)
notesrouter.get("/:subjectId",getnotesbysubjectid)



export default notesrouter