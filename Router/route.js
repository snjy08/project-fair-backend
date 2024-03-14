//import express
const express = require('express')

const userController = require('../Controllers/userController')
const projectController = require('../Controllers/projectController')
const jwtMiddleware = require('../MIddlewares/jwtMiddleware')
const multerConfig = require('../MIddlewares/multerMiddleware')

//create a router object of express to define routes(paths)
const router = new express.Router()

//using router object to define paths

//1 register API routes - localhost:4000/register
router.post('/register',userController.register)

//2 login API routes -localhost4000/login
router.post('/login',userController.login)

//3 add user project api routes - localhost:4000/project/add
router.post('/projects/add',jwtMiddleware,multerConfig.single('projectimage'),projectController.addUserProject)

//get user project  api routes- localhost:4000/projects/all-user-projects
router.get('/projects/all-user-projects',jwtMiddleware,projectController.getUserProject)

////get user project  api routes- localhost:4000/projects/all-projects
router.get('/projects/all-projects',jwtMiddleware,projectController.getAllProjects)

////get user project  api routes- localhost:4000/projects/home-projects
router.get('/projects/home-projects',projectController.getHomeProject)

//update project routes - localhost:400/project/update-project/7776767
router.put('/projects/update-projects/:id',jwtMiddleware,multerConfig.single('projectimage'),projectController.editProject)

//delete project routes  - localhost:4000/projects/delete-project/546475758
router.delete('/projects/delete-projects/:pid',jwtMiddleware,projectController.deleteProject)

module.exports = router