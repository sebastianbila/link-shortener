import mongoose from 'mongoose'
import app from './app'
import {MONGO_URI, PORT} from '../utils/config';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch((e) => {
    console.error(`MongoDB not connected. Error: ${e}`)
})

mongoose.connection.on('connected', () => {
    console.log('MongoDB database connection established successfully')
})

app.listen(PORT, () => console.log(`Server has been started on ${PORT}`))
