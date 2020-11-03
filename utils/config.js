import env from 'dotenv'

env.config()

export const PORT = process.env.PORT
export const MONGO_URI = process.env.MONGO_URI
export const JWT_SECRET = process.env.JWT_SECRET
export const BASE_URL = process.env.BASE_URL

const config = {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    BASE_URL
}

export default config

