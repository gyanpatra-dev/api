"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const videocontroller_1 = require("../../controller/VideoController/videocontroller");
const videorouter = express_1.default.Router();
videorouter.get("/", videocontroller_1.getvideos);
videorouter.post("/create", videocontroller_1.createvideolink);
videorouter.get("/:subjectId", videocontroller_1.getvideolinksbysubjectid);
exports.default = videorouter;
