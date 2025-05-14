import express from 'express'
import { deleteUser, getAllUser, getUser, updateUser } from '../controller/User.controller.js'
import upload from '../config/multer.js'
const router = express.Router()

router.get('/get-user/:userid',getUser)
router.put('/update-user/:userid',upload.single('file'),updateUser)
router.get('/get-all-user',getAllUser)
router.delete('/delete/:id',deleteUser)

export default router