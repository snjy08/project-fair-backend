const users = require('../Models/userSchema')

//import jwt token
const jwt = require('jsonwebtoken')

//register logic
exports.register = async (req, res) => {
  console.log("Inside register function");

  const { username, email, password , github , link } = req.body

  try {
    //if check the email is alraedy in db-> user already registered
    const existingUser = await users.findOne({ email })
    if (existingUser) {
      res.status(401).json("user already registered")
    }
    //if the email is not present in db-> new user will save to the database
    else {
      const newuser = await users({
        username, email, password, github: '', link: "", profile: ""
      })
      await newuser.save()//save new user data to database
      res.status(200).json("user registration succesful")
    }
  }
  catch (err) {
    res.status(500).json("server error: " + err.message)
  }
  console.log(`${username} ${email} ${password} ${github} ${link}`);

}

//login logic
exports.login = async (req, res) => {
  console.log("Inside login function");
  const { email, password } = req.body
  try {
    //if check the email is alraedy in db-> user already registered
    const existingUser = await users.findOne({ email, password })
    if (existingUser) {
      //token generation
      const token = jwt.sign({ userId: existingUser._id }, "superkey2024")
      console.log(token);
      res.status(200).json({ existingUser, token })//response
    }
    //if the email is not present in db-> new user will save to the database
    else {
      res.status(401).json("invalid login")
    }
  }

  catch (err) {
    res.status(500).json("server error: " + err.message)
  }
}