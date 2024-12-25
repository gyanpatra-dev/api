import { Router } from "express";
const adminrouter =  Router()


import { getusers } from "../controller/user.controller";


adminrouter.get("/",getusers)

export default adminrouter