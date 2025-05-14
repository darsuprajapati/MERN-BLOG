import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors"
import mongoose from "mongoose"


import MainRouter from "./routers/Main.route.js"

// env config
dotenv.config()

// app config
const PORT = process.env.PORT || 4000
const app = express();

// gobal middlwear
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

// create a database
mongoose.connect(process.env.MONGODB_CONN, { dbName: 'mern-blog' })
    .then(() => console.log('Database connected sucessfylly✅'))
    .catch(err => console.log('Database connection faild ❌', err))

// Router setep

app.use("/api", MainRouter)


// create a Server
app.listen(PORT, () => {
    console.log(`Server Running on port http://localhost:${PORT}`);
})

// error handling middlewear

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error.'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})