import { Router } from "express";
const adminrouter =  Router()


import { getusers } from "../../controller/UserController/user.controller";


adminrouter.get("/",getusers)

export default adminrouter