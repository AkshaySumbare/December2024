import User from "../models/user-mode.js";
import bcryptjs from "bcrypt";
 import errorHandler from '../utils/error.js';
import Jwt from "jsonwebtoken";


export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, 'All fiels are required'));
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    await newUser.save();
    res.json("Signup successfully");
  } catch (error) {
   next(error);
  }
};


export const signin = async(req, res,next)=>{
  const {email, password } = req.body;
  if (
    !email ||
    !password ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fiels are required'));
  }
  try {
    const validUser = await User.findOne({email});
    if (!validUser) {
     return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
     return next(errorHandler(400, 'Invalid password'));
    }
      const token = Jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin}, process.env.JWT_SECRET);
      const {password: pass, ...rest} = validUser._doc; //to hide the password 
      res.status(200).cookie('access_token', token, {
        httpOnly: true}).json(rest);
  } catch (error) {
   next(error);
  }
};

