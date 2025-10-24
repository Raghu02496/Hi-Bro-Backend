import { userModel } from "../models/models.js"
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";

export async function login(request, response){
    try{
        const {userName, password} = request.body
        
        const user = await userModel.findOne({userName : userName})
    
        if(!user){
            return response.status(400).json({ok : false, data : "User not found"})
        }
    
        const valid = await bcrypt.compare(password, user.password)
    
        if(!valid){
            return response.status(400).json({ok : false, data : "Invalid password"})
        }
    
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '1h'})
        
        response.cookie("token",token,{
            httpOnly: true,
            secure: process.env.PROD,
            sameSite: 'None',
            maxAge : 3600000,
            path : '/'
        })

        return response.json({ok : true, data : 'Sign in successful'})
    }catch(error){
        console.log(error,'error')
        return response.status(500).json({ ok: false, error: error })
    }
}

export async function logout(request, response) {
    try{
        response.clearCookie("token",{
            httpOnly: true,
            secure: process.env.PROD,
            sameSite: 'None',
            maxAge : 3600000,
            path : '/'
        });
        return response.json({ ok: true, message: "Logged out successfully" });
    }catch(error){
        console.log(error,'error')
        return response.status(500).json({ ok: false, error: error })
    }
}