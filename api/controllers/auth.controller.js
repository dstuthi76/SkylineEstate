import User from "../models/user.model.js";
import bcrptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
export const signup = async(req, res,next) => {
    const {username,email,password,mobileNumber,address,state,district,mandal,pincode}=req.body;
    const hashedpassword =bcrptjs.hashSync(password,10);
    const newuser =new User ({username,email,password:hashedpassword,mobileNumber,address,state,district,mandal,pincode});
    try {
        await newuser.save();
        res.status(201).json('User Created successfully!!');
    } catch (error) {
        next(error);
    }
};
