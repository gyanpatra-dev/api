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
exports.getallyear = void 0;
const client_1 = require("@prisma/client");
// instances
const prisma = new client_1.PrismaClient();
const getallyear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { branchId } = req.params;
    const branchid = Number(branchId);
    if (!branchid) {
        res.status(400).json({
            message: "All Fields Are Required"
        });
        return;
    }
    try {
        const requiredyear = yield prisma.year.findMany({
            where: {
                branchId: branchid
            }
        });
        res.json({
            requiredyear
        });
    }
    catch (error) {
        message: "Not Found";
        err: error;
    }
});
exports.getallyear = getallyear;
// export const createyear = async(req: Request,res: Response)=>{
//     const{branchId} = req.params
//     const branchid = Number(branchId)
//     if(!branchid){
//          res.status(400).json({
//             message: "All Fields Are Required"
//         })
//         return;
//     }
//     try {
//         const newyear = await prisma.year.create({
//             data:{
//                 branchId:branchid
//             }
//         })
//         res.json({
//             message: "Year Created Successfully",
//             newyear
//         })
//     } catch (error) {
//         message:error
//     }
// }
