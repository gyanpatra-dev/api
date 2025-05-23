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
exports.getAnalytics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalPyqs = yield prisma.pyq.count();
        const totalNotes = yield prisma.notes.count();
        const totalYoutubeLinks = yield prisma.youtubeLinks.count();
        if (!totalNotes || !totalPyqs || !totalYoutubeLinks) {
            res.status(500).json({
                message: "Something went wrong"
            });
            return;
        }
        res.status(200).json({
            message: "Successfully fetched analytics",
            pyqs: totalPyqs,
            notes: totalNotes,
            youtubeLinks: totalYoutubeLinks
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({
            message: err.message
        });
    }
});
exports.getAnalytics = getAnalytics;
