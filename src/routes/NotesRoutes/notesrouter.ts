import { Router } from "express";
import { createnotes, getnotes, getnotesbysubjectid,getnotesbyid } from "../../controller/NotesController/notes.controller";
const notesrouter = Router()

notesrouter.post("/create",createnotes)
notesrouter.get("/",getnotes)
notesrouter.get("/:subjectId",getnotesbysubjectid)
notesrouter.get("/getone/:notes_id",getnotesbyid)



export default notesrouter