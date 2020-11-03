import express from "express";
import authRoute from "../routes/auth.route";
import linkRoute from "../routes/link.route";
import redirectRoute from "../routes/redirect.route";
import path from 'path'

const app = express()

app.use(express.json({extended: true}))
app.use('/api/auth', authRoute)
app.use('/api/link', linkRoute)
app.use('/t', redirectRoute)

// Need for heroku deployment
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"))
    })
}

export default app
