const express = require('express')
const router = express.Router()
const {saveOrLoginUser,login,createUser,users,updateProfileUser,getUser} = require('../controller/userCtrl')
const { authMiddleware } = require('../config/authMiddlware')
router.get('/users',authMiddleware,users)
router.post('/save-login' , saveOrLoginUser)
router.post('/saveuser' , createUser)
router.put('/edit-info',authMiddleware,updateProfileUser)
router.post('/login',login)
router.get('/user/:id',authMiddleware,getUser)

module.exports = router