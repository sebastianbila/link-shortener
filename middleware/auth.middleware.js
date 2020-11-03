import jwt from 'jsonwebtoken'
import {JWT_SECRET} from '../utils/config';
import {unauthorized} from '../utils/server.reponse'

export default function (req, res, next) {
    if (req.method === 'OPTIONS') return next
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) unauthorized(res, 'Unauthorized')

        req.user = jwt.verify(token, JWT_SECRET)
        next()
    } catch (e) {
        unauthorized(res, 'Unauthorized')
    }
}
