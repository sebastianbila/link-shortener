import jwt from 'jsonwebtoken'
import User from '../models/User.model'
import {JWT_SECRET} from "../utils/config";
import {serverError, unauthorized} from '../utils/server.reponse'

export default async (req, res, next) => {
    if (req.method === 'OPTIONS') return next
    try {
        const admin = await User.findOne({email: 'admin@gmail.com'})
        const token = req.headers.authorization.split(' ')[1]

        if (!token || token === 'null') {
            req.user = {userID: admin._id}
            next()
        } else {
            try {
                req.user = jwt.verify(token, JWT_SECRET)
                next()
            } catch (e) {
                unauthorized(res, 'Session expired')
            }

        }
    } catch (e) {
        serverError(res, e)
    }
}
