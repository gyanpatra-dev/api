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
const userrouter_1 = __importDefault(require("./routes/UserRoutes/userrouter"));
const authrouter_1 = __importDefault(require("./routes/AuthRoutes/authrouter"));
const admin_router_1 = __importDefault(require("./routes/AdminRoutes/admin.router"));
const branchroute_1 = __importDefault(require("./routes/BranchRoutes/branchroute"));
const yearrouter_1 = __importDefault(require("./routes/yearRoutes/yearrouter"));
//middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome To IITKIRBA Api"
    });
});
app.use("/api/user", userrouter_1.default);
app.use("api/admin", admin_router_1.default);
app.use("/api/user/auth", authrouter_1.default);
app.use("/api/branch", branchroute_1.default);
app.use("/api/year", yearrouter_1.default);
app.listen(process.env.PORT || 6000, () => {
    console.log(`server is running at http://localhost:${process.env.PORT}`);
});
