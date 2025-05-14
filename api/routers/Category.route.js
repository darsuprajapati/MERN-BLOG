import express from 'express'
import { addCategory, deleteCategory, getAllCategory, showCategory, updateCategory } from '../controller/Category.controller.js'
import { onlyadmin } from '../middleware/onlyadmin.js'


const router = express.Router()

router.post('/add', onlyadmin,addCategory)
router.put('/update/:categroyid',onlyadmin, updateCategory)
router.get('/show/:categoryid',onlyadmin, showCategory)
router.delete('/delete/:categoryid',onlyadmin, deleteCategory)
router.get('/all-category', getAllCategory)


export default router