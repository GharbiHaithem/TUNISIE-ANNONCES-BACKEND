const express = require('express')
const {createAnnonce,getMyAllAnnonces,getannByid} = require('../controller/annonce')
const { authMiddleware, isAdmin } = require('../config/authMiddlware')
const router = express.Router()
router.post('/create-annonce',authMiddleware,createAnnonce)
// router.delete('/delete-cat-product/:id',authMiddleware,isAdmin,deleteCategoryProduct)
// router.put('/update-cat-product/:id',authMiddleware,isAdmin,updateCategoryProduct)
router.get('/getAnnonce/:id',getannByid)
router.get('/getMyAnnonce',authMiddleware,getMyAllAnnonces)


module.exports = router