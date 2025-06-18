import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';
import User from '../model/user.js';


export const register = async (req,res)=>{
    const {name ,email ,password} =  req.body;
    try{
        if(!name || !email || !password){
            return res.status(400).json({msg:'All fields are required'});
        }
        const existingUser =  await User.findOne({email});
        if(existingUser){
            return res.status(200).json({msg:'User already exists'});
        }
        const user = await User.create({name,email,password});
        const token = generateToken(user._id);
        res.status(201).json({
            user:{id: user._id , name: user.name , email: user.email},
            token,
        });
    }catch(err){
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
}


export const login = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        const token = generateToken(user._id);
        res.json({
            user:{id:user._id,name:user.name,password:user.password},
            token,
        });
    }catch(err){
        res.status(500).json({msg:'Server error'});
    }
}
