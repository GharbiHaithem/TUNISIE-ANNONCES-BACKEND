const express = require('express')
const {createAnnonce,getMyAllAnnonces,getannByid,updateAnnonces,deleteImageAnnonce,getAnnoncesByUser,getAllAnnonce} = require('../controller/annonce')
const { authMiddleware, isAdmin } = require('../config/authMiddlware')
const router = express.Router()
router.post('/create-annonce',authMiddleware,createAnnonce)
router.delete('/:annonceId/images/:public_id',authMiddleware,deleteImageAnnonce)
router.get('/getAnnonces',authMiddleware,getAllAnnonce)
// router.delete('/delete-cat-product/:id',authMiddleware,isAdmin,deleteCategoryProduct)
// router.put('/update-cat-product/:id',authMiddleware,isAdmin,updateCategoryProduct)
router.get('/getAnnonce/:id',getannByid)
router.get('/getAnnonceByUser/:userid',getAnnoncesByUser)
router.get('/getMyAnnonce',authMiddleware,getMyAllAnnonces)


router.put('/edit-annonce/:id' , authMiddleware,updateAnnonces)

module.exports = router