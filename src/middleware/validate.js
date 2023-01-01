import { loginShema, eventsShema } from "../utils/validation.js"

export default (req, res, next) => {
    try {
        if (req.url == '/admins' && req.method == "POST") {
          let { error } = loginShema.validate(req.body)

          if (error) throw error;     
        }

        if (req.url == "/events" && req.method == "POST") {
    
            let { error } = eventsShema.validate(req.body)

            if (error) throw error
        }

        return next()

        
    } catch (error) {
        res.status(400).json({status:400,error: error.message})
    }
}