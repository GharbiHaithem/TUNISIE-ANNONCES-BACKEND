const express = require('express')
const {createAnnonce,getMyAllAnnonces,getannByid,updateAnnonces,deleteImageAnnonce} = require('../controller/annonce')
const { authMiddleware, isAdmin } = require('../config/authMiddlware')
const router = express.Router()
router.post('/create-annonce',authMiddleware,createAnnonce)
router.delete('/:annonceId/images/:public_id',authMiddleware,deleteImageAnnonce)
// router.delete('/delete-cat-product/:id',authMiddleware,isAdmin,deleteCategoryProduct)
// router.put('/update-cat-product/:id',authMiddleware,isAdmin,updateCategoryProduct)
router.get('/getAnnonce/:id',getannByid)
router.get('/getMyAnnonce',authMiddleware,getMyAllAnnonces)
router.put('/edit-annonce/:id' , authMiddleware,updateAnnonces)

module.exports = router