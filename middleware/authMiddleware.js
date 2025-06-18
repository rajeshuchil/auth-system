import jwt from 'jsonwebtoken';
import User from '../model/user.js'

const authMiddleware = async (req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1];
    if(!token){
        return res.status(401).json({msg:'No token '});
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    }catch(err){
        console.error(err.message);
        return res.status(401).json({msg:'Token is not valid'});
    }
}

export default authMiddleware;