"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//files import
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use("/api/user", user_routes_1.default);
app.use("/api/user/auth", auth_routes_1.default);
app.listen(process.env.PORT || 6000, () => {
    console.log(`server is running at http://localhost:${process.env.PORT}`);
});
