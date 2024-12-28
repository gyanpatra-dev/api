import { Router } from "express";
import { createnotes, getnotes } from "../../controller/NotesController/notes.controller";
const notesrouter = Router()

notesrouter.post("/create",createnotes)
notesrouter.get("/",getnotes)



export default notesrouter