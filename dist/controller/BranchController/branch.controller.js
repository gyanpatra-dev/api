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
exports.createbranch = exports.getallbranch = void 0;
const getallbranch = (req, res) => {
    res.json({
        message: "Hello From Brach controller"
    });
};
exports.getallbranch = getallbranch;
const createbranch = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const {};
});
exports.createbranch = createbranch;
