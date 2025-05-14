import express from 'express'
import { doLike, likeCount } from '../controller/BlogLike.controller.js'
import { authenticate } from '../middleware/authenticate.js'

const router = express.Router()

router.post('/do-like', authenticate, doLike)
router.get('/get-like/:blogid', likeCount)

export default router
