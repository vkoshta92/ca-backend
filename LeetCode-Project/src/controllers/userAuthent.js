const User = require("../models/user.js");
const validate = require("../utils/validator.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const resister = async () => {
  try {
    validate(req.body);
    const { firstName, emailId, password } = req.body;

    // ye email id exist to nhi krti but no need  user.create autmatic kr dega.
    // const isExistEmailId= User.exits({emailId});

    req.body.password = await bcrypt.hash(password, 10);

    //

    const user = await User.Create(req.body);

    const token = jwt.sign(
      { _id: user._id, emailId: emailId },
      process.env.JWT_KEY,
      { expiresIn: 60 * 60 }
    ); // seconds
    res.cookie("token", token, { maxAge: 60 * 60 * 1000 }); // milisesonds
    res.status(201).send("User Resister Succesfully");
  } catch (err) {
    res.status(400).send("Error:" + err);
  }
};


const login = async (req,res)=>{

  try{
      const {emailId, password} = req.body; // ye user ne dala hai

      if(!emailId)
          throw new Error("Invalid Credentials");
      if(!password)
          throw new Error("Invalid Credentials");

      const user = await User.findOne({emailId}); // mongo se

      const match = bcrypt.compare(password,user.password);

      if(!match)
          throw new Error("Invalid Credentials");

      const token =  jwt.sign({_id:user._id , emailId:emailId},process.env.JWT_KEY,{expiresIn: 60*60});
      res.cookie('token',token,{maxAge: 60*60*1000});
      res.status(200).send("Logged In Succeessfully");
  }
  catch(err){
      res.status(401).send("Error: "+err);
  }
}


// logout feature 

 const logout = async(req,res)=>{
  try{

  }
  catch(err){

  }
 }

 module.exports={resister,login,logout}