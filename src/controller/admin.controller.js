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

        let  ADMINKA = (req, res) => {
            try {
                let events = read("events")
                let { token } = req.params;
                let { eventId, status } = req.body;

              
               if (!token) {
                throw new Error("token is required")
               }

               if (!(eventId)) {
                throw new Error("status and eventId is required")
               }

               if (!(status && status == true)) {
                throw new Error("status shundogam false yoki status faqat true bolishi kerak😒")
               }

              let result = events.find(event => event.event_Id == eventId);

              if (!result) {
                throw new Error("eventId ga tegihli event topilmadi")
              }

              result.status = Boolean(status)
              write("events", events)
              res.status(200).json({status: 200, message: "ok"})
              console.log(result.status);
              

            } catch (error) {
                res.status(400).json({status: 400, message: error.message})
            }
        }
        
        
        export default {
            LOGIN,
            ADMINKA
        }