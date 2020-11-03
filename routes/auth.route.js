import {Router} from 'express'
import jwt from 'jsonwebtoken'
import {check, validationResult} from 'express-validator'
import User from '../models/User.model'
import bcrypt from 'bcryptjs'
import {JWT_SECRET} from '../utils/config';
import {badRequest, created, ok, serverError, notFound} from '../utils/server.reponse'

/* Instance of router */
const router = new Router()

const validation = [
    check('email', 'Email is required').exists(),
    check('password', 'Password is required').exists(),
    check('email', 'Wrong email').normalizeEmail().isEmail(),
    check('password', 'The minimum password length is 6 characters').isLength(6)
]

/* RegistrationPage */
router.post(
    '/register',
    validation,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return badRequest(res, {
                errors: errors.array(),
                message: 'Incorrect registration data. Try again ...'
            })

            const {name, email, password} = req.body
            const candidate = await User.findOne({email})

            if (candidate) return badRequest(res, 'Email is being used')

            const b_password = await bcrypt.hash(password, 12)

            const user = new User({name, email, password: b_password})
            await user.save()

            created(res, 'User was successfully created')
        } catch (e) {
            serverError(res, e)
        }
    }
)

/* LoginPage */
router.post(
    '/login',
    validation,
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return badRequest(res, {
                errors: errors.array(),
                message: 'Incorrect login data. Try again ...'
            })

            const {email, password} = req.body

            const user = await User.findOne({email})
            if (!user) return notFound(res, 'User not found')

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return badRequest(res, 'Cannot login. Email or password doesn\'nt match')

            const userID = user.id
            const username = user.name
            const token = jwt.sign({userID}, JWT_SECRET, {expiresIn: '1h'})
            ok(res, {token, userID, username})
        } catch (e) {
            serverError(res, e)
        }
    }
)

export default router
