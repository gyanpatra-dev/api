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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = exports.signup = void 0;
// imports
require("dotenv").config();
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const lodash_1 = require("lodash");
const JWT_USER_SECRET = process.env.JWT_USER_SECRET || "oweqvoqv brluigreuibvuib2ruib";
// instances
const prisma = new client_1.PrismaClient();
// controllers
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const requiredbody = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(4).max(20),
        name: zod_1.z.string(),
        branch: zod_1.z.enum([
            "CSE",
            "IT",
            "EE",
            "ETC",
            "EEE",
            "PE",
            "CHE",
            "CE",
            "MME",
            "ME",
        ]),
        // semester: z.string(),
        role: zod_1.z.enum(["USER", "ADMIN"]),
    });
    const parseddata = requiredbody.safeParse(req.body);
    console.log(req.body);
    console.log(parseddata);
    if (!parseddata.success) {
        res.status(400).json({
            message: "Bad Request Incorrect Input Format",
            error: parseddata.error,
        });
        return;
    }
    const { email, password, name, branch, semester } = req.body;
    try {
        const existinguser = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existinguser) {
            res.status(409).json({
                message: "Email Is Already Regestered",
            });
            return;
        }
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        console.log(hashedpassword);
        const newuser = yield prisma.user.create({
            data: {
                email,
                password: hashedpassword,
                name,
                // branch,
                // semester,
            },
        });
        console.log(newuser);
        const token = jsonwebtoken_1.default.sign({ userId: newuser.user_id }, JWT_USER_SECRET, {
            expiresIn: "1h",
        });
        res.status(201).json({
            message: "User Successfully Created",
            newuser: (0, lodash_1.omit)(newuser, ["password"]),
            token
        });
        return null;
    }
    catch (error) {
        res.status(501).json({
            message: "Error While Signing Up",
            err: error,
        });
        return;
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        res.json({
            message: "All The Fields Are Required"
        });
        return;
    }
    try {
        const user = yield prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            res.status(404).json({
                message: "User Not Found Try Signing Up"
            });
            return;
        }
        const comparedpassword = yield bcrypt_1.default.compare(password, user.password);
        if (!comparedpassword) {
            res.status(401).json({
                message: "Something Went Wrong"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userid: user.user_id }, JWT_USER_SECRET, { expiresIn: "1hr" });
        res.status(200).json({
            message: "user signedin successfully",
            token
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error While Signing Up",
            err: error
        });
    }
});
exports.signin = signin;
