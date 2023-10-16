import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password, mobileNumber, address, state, district, mandal, pincode } = req.body;
    const saltRounds = 10; // You can adjust the number of salt rounds as needed

    try {
        const hashedPassword = await bcryptjs.hash(password, saltRounds);

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

        await newuser.save();
        res.status(201).json('User Created successfully!!');
    } catch (error) {
        next(error);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(410, 'User not found!'));

        const validPassword = await bcryptjs.compare(password, validUser.password);

        if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
        const { password: pass,...rest}=validUser._doc;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
}; 