import { Router } from "express";
const router =  Router()


import { getusers } from "../controller/user.controller";


router.get("/",getusers)

export default router