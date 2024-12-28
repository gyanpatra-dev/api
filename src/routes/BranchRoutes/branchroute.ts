import { Router } from "express";
const branchrouter = Router()
import { getallbranch } from "../../controller/BranchController/branch.controller";
import { createbranch } from "../../controller/BranchController/branch.controller";



branchrouter.get("/", getallbranch)
branchrouter.post("/create",createbranch)


export default branchrouter