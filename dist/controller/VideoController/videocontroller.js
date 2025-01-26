"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getvideolinksbysubjectid = exports.createvideolink = exports.getvideos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getvideos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allvideoslinks = yield prisma.youtubeLinks.findMany({
            select: {
                video_id: true,
                link: true,
                videoname: true,
                subjectId: true,
            },
        });
        if (!allvideoslinks || allvideoslinks.length === 0) {
            res.status(400).json({
                message: "No Videos Found",
            });
            return;
        }
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err.message,
        });
        return;
    }
});
exports.getvideos = getvideos;
const createvideolink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId, link, videoname } = req.body;
    if (!subjectId ||
        !link ||
        !videoname ||
        subjectId === "" ||
        link === "" ||
        videoname === "") {
        res.status(400).json({
            message: "All Fields Are Required",
        });
        return;
    }
    const parsedsubjectid = parseInt(subjectId);
    try {
        const videolink = yield prisma.youtubeLinks.create({
            data: {
                subjectId: parsedsubjectid,
                link,
                videoname,
            },
        });
        if (!videolink) {
            res.status(400).json({
                message: "Video link not created",
            });
            return;
        }
        res.status(200).json({
            message: "Video Link Created",
            videolink,
        });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err.message,
        });
        return;
    }
});
exports.createvideolink = createvideolink;
const getvideolinksbysubjectid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjectId = req.params.subjectId;
    if (!subjectId) {
        res.status(400).json({ message: "Subject Id is Required" });
        return;
    }
    const parsedsubjectid = parseInt(subjectId);
    try {
        const videolinks = yield prisma.youtubeLinks.findMany({
            where: {
                subjectId: parsedsubjectid
            },
            select: {
                subjectId: true,
                link: true,
                videoname: true
            }
        });
        if (!videolinks || videolinks.length === 0) {
            res.json({ message: "No Video Links Found" });
            return;
        }
        res.json({ videolinks });
    }
    catch (error) {
        const err = error;
        res.status(400).json({
            message: err.message,
        });
        return;
    }
});
exports.getvideolinksbysubjectid = getvideolinksbysubjectid;
