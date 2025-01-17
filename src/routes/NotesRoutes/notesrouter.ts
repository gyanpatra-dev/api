import { Router } from "express";
import { createnotes, getnotes, getnotesbyId } from "../../controller/NotesController/notes.controller";
const notesrouter = Router()

notesrouter.post("/create",createnotes)
notesrouter.get("/",getnotes)
notesrouter.get("/:subjectId",getnotesbyId)



export default notesrouter