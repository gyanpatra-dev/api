import express from 'express';
import { createvideolink, getvideolinksbysubjectid, getvideos } from '../../controller/VideoController/videocontroller';
const videorouter = express.Router();

videorouter.get("/",getvideos);
videorouter.post("/create",createvideolink);
videorouter.get("/:subjectId",getvideolinksbysubjectid)

export default videorouter;
