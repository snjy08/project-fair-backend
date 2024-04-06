
const projects = require('../Models/projectSchema');

//add the project schema

exports.addUserProject = async (req, res) => {
    console.log("inside addUserProject");
    // res.status(200).json("add user project request")

    // //user id get

    const userId = req.payload
    console.log(userId);

    // //get add project details

    const { title, language, github, link, overview } = req.body

    //get the image

    projectimage = req.file.filename
    console.log(projectimage);

    //logic of adding the new project
    try {
        const existingProject = await projects.findOne({ github })
        if (existingProject) {
            res.status(404).json("project already existing")
        }
        else {
            const newProject = new projects({ title, language, github, link, overview, projectimage, userId })
            await newProject.save()//save new project details into mongodb
            res.status(200).json(newProject)//send response to the client
        }
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}
//get user projects 
exports.getUserProject = async (req,res) => {
    // get user id first
    const userId = req.payload;
    console.log(userId);
    // api request
    try {
        // to get the project infromation from a particular user
        const userProject = await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject)   //send response to the client
    } catch (err) {
        res.status(401).json(err.message)
    }
}

//get all projects 
exports.getAllProjects = async (req, res) => {
    const searchKey = req.query.search
    console.log(searchKey)

    const query = {
        language: {
             $regex: searchKey, $options: 'i'
        } 
   }
    try {
        const allProjects = await projects.find(query)
        res.status(200).json(allProjects)//send response to the projects

    }
    catch (err) {
        res.status(401).json(err.message)
    }
}

//3 get home projects
exports.getHomeProject = async (req,res) => {
    try {
        const HomeProject = await projects.find().limit(3)
        res.status(200).json(HomeProject)
    }
    catch (err) {
        res.status(401).json(err.message)
    }
}

//4 edit projectdetails
exports.editProject = async (req,res)=>{
    const {title,language,github,link,overview,projectimage} = req.body;
     const uploadImage = req.file?req.file.filename:projectimage;
     const userId = req.payload ;
     const {id} = req.params

     try{
//find the particular projectid in mongodb and add the updated projectdetails
        const updateProject = await projects.findByIdAndUpdate({_id:id}, {title,language,github,link,overview,projectimage:uploadImage,userId},{new:true})
        //save the updated projectdetails
        await updateProject.save()
        //response send back to the client
        res.status(200).json(updateProject)
        console.log(updateProject);
     }
     catch(error){
        res.status(401).json(error)
     }
}
 //delete project
exports.deleteProject = async (req,res) => {
    const {pid} = req.params 

    try{
        const deleteData = await projects.findByIdAndDelete({_id:pid})
        res.status(200).json(deleteData)
    }
    catch(err){
        res.status(401).json(err.message)
    }
}