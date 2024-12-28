// imports

import { Router } from "express";
import { signup } from "../../controller/AuthController/auth.controller";
import { signin } from "../../controller/AuthController/auth.controller";


// instances
const authrouter = Router();


// routes 
authrouter.post("/signup",signup);
authrouter.post("/signin",signin);






export default authrouter