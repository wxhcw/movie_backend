const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const adminHandler = require('../router_handler/admin')

// 更新电影基本信息
router.post('/updateMovInfo', adminHandler.updateMovInfo)
// 删除电影基本信息
router.get('/delMovInfo/:movieId', adminHandler.delMovInfo)
// 添加电影基本信息
router.post('/insertMovInfo', adminHandler.insertMovInfo)
module.exports = router
