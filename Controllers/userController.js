const users = require('../Models/userSchema')

//import jwt token
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
  const { username, email, password, github, link } = req.body;

  try {
      // Check if the email or github is already in use
      const existingUser = await users.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: 'Email or Github already in use' });
      }

      // Create a new user
      const newUser = new users({
          username,
          email,
          password,
          github,
          link,
          profile:""
      });

      // Save the user to the database
      await newUser.save();

      res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};
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