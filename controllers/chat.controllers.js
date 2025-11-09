import { userModel } from "../models/models.js"

export async function listUsers(request, response){
    try{
        const { page_no } = request.body
        let users = await userModel.find({},{password : 0})
        users = users.filter((user)=> user._id.toString() != request.userId)
        users = users.map(user =>{
            user._id = user._id.toString()
            return user
        })
        return response.json({ok : true , data : users})
    }catch(error){
        console.log(error,'error')
        return response.status(500).json({ ok: false, error: error })
    }
}