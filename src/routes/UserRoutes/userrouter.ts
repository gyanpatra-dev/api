import { Router } from "express";
const userrouter = Router();

import { getusers } from "../../controller/UserController/user.controller";


userrouter.get("/", getusers);


export default userrouter;
