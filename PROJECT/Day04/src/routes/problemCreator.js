const express = require('express');

const problemRouter =  express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")


// Create
problemRouter.post("/create",adminMiddleware ,createProblem);
problemRouter.patch("/:id", updateProblem);
problemRouter.delete("/:id",deleteProblem);


problemRouter.get("/:id",getProblemById);
problemRouter.get("/", getAllProblem);
problemRouter.get("/user", solvedAllProblembyUser);

// fetch
// update
// delete 
