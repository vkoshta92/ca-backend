const express = require('express');
const {createProblem,updateProblem,deleteProblem,getProblemById,getAllProblem} = require("../controllers/userProblem");
const problemRouter =  express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")
const userMiddleware = require("../middleware/userMiddleware");

// Create
problemRouter.post("/create",adminMiddleware ,createProblem);
// problemRouter.patch("/:id",adminMiddleware, updateProblem);
// problemRouter.delete("/:id",adminMiddleware,deleteProblem);


// problemRouter.get("/:id",userMiddleware,getProblemById);
// problemRouter.get("/", userMiddleware,getAllProblem);
// problemRouter.get("/user", userMiddleware,solvedAllProblembyUser);


module.exports = problemRouter;


// fetch
// update
// delete 
