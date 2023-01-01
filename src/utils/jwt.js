import jwt from "jsonwebtoken";

let secret = "olma"

export default {
    sign: (payload) => jwt.sign(payload, secret),
    verify : (token) => jwt.verify(token, secret)
}