import express from 'express';
import { register,login } from '../controller/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register',register);
router.post('/login',login);
router.get('/protected',authMiddleware,(req,res)=>{
    res.json({msg:'Protected route accessed',user:req.user});
})

export default router;