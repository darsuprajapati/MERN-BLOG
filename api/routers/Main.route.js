import express from 'express'
import authRouter from "./Auth.route.js"
import userRouter from "./User.route.js"
import categoryRoute from "./Category.route.js"
import BlogRoute from "./Blog.route.js"
import CommentRoute from "./Comment.route.js"
import BlogLikeRoute from "./Bloglike.route.js"
import { authenticate } from '../middleware/authenticate.js'

const router = express.Router()

router.use("/auth", authRouter)
router.use("/user", authenticate,userRouter)
router.use("/category", categoryRoute)
router.use("/blog", BlogRoute)
router.use("/comment", CommentRoute)
router.use("/blog-like", BlogLikeRoute)


export default router