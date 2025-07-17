import UserModel from '../models/User.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


const registerUser = async (req,res) =>{
    try {
        const {name, email, password, role} = req.body;
        const existingUser = await UserModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message: "user already exists"});
        }
        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new UserModel({name, email, password: hashedPassword, role});
        await newUser.save();
        res.status(201).json({message: "user registered successfully"});
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password}= req.body;
        const user = await UserModel.findOne({email: email});
        if(!user){
            return res.status(400).json({message: "user not found"});
        }
        const isMatch = bcrypt.compareSync(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "invalid credentials"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET,{ expiresIn: '1d' }

        )
        res.status(200).json({
            message: "login successful", 
            token, 
            user: {id: user._id, name: user.name, email: user.email, role: user.role}
        });
        
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
    
}

const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: "server error", error: error.message});
    }
}

export {registerUser, loginUser, getAllUsers};