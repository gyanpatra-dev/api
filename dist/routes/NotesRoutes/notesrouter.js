"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notes_controller_1 = require("../../controller/NotesController/notes.controller");
const notesrouter = (0, express_1.Router)();
notesrouter.post("/create", notes_controller_1.createnotes);
notesrouter.get("/", notes_controller_1.getnotes);
notesrouter.get("/:subjectId", notes_controller_1.getnotesbyId);
exports.default = notesrouter;
