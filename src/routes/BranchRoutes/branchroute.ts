import { Router } from "express";
const branchrouter = Router()
import { getallbranch, updatebranch } from "../../controller/BranchController/branch.controller";
import { createbranch } from "../../controller/BranchController/branch.controller";



branchrouter.get("/", getallbranch)
branchrouter.post("/create",createbranch);
branchrouter.post("/update",updatebranch)


export default branchrouter