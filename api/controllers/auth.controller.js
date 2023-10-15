import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password, mobileNumber, address, state, district, mandal, pincode } = req.body;
    const saltRounds = 10; // You can adjust the number of salt rounds as needed
    const salt = bcryptjs.genSaltSync(saltRounds);
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const newuser = new User({
        username,
        email,
        password: hashedPassword,
        mobileNumber,
        address,
        state,
        district,
        mandal,
        pincode
    });

    try {
        await newuser.save();
        res.status(201).json('User Created successfully!!');
    } catch (error) {
        next(error);
    }
};
