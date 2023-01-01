import jwt from "../utils/jwt.js";
import { read, write } from "../utils/model.js";



  let LOGIN = (req,res) => {
    
    try {
        
        let { username, password } = req.body;
        
        let admins = read("admins");
        for (let item of admins) {
            if (username == item.username) {
                throw new Error("username is already in use")
            }
        }

      
        let newAdmin = {
            admin_Id : admins.at(-1).admin_Id + 1 || 1,
            username,password
        }
        
        admins.push(newAdmin)
        write('admins', admins)
        res.status(200).json({
        status: 200,
        message: "ok",
        data: newAdmin,
        token: jwt.sign({adminId: newAdmin.admin_Id})})
    } catch (error) {
        res.status(400).json(
            {status:400, message: error.message})
    }
}


export default {
    LOGIN
}