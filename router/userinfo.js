const express = require('express')
const router = express.Router()

// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi')
// 导入需要的验证规则对象
const { update_userinfo_schema, update_password_schema } = require('../schema/user')

// 导入用户信息的处理函数模块
const userinfo_handler = require('../router_handler/userinfo')

// 获取用户的基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
// 更新用户的基本信息
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
// 重置密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
// 购买电影票生成订单（新增订单信息）
router.post('/insertOrder', userinfo_handler.insertOrder)
// 根据用户ID获取订单信息
router.post('/orderInfo/:customerId', userinfo_handler.getOrderInfo)
// 根据ID删除订单信息
router.get('/delOrderInfo/:orderId', userinfo_handler.delOrderInfo)
module.exports = router
