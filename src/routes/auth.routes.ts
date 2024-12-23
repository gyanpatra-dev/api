// imports

import { Router } from "express";
import { signup } from "../controller/auth.controller";
import { signin } from "../controller/auth.controller";


// instances
const authrouter = Router();


// routes 
authrouter.post("/signup",signup);
authrouter.post("/signin",signin);






export default authrouter