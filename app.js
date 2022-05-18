const express = require('express') // 导入 express 模块
const app = express() // 创建 express 的服务器实例
const joi = require('joi')

const cors = require('cors') // 导入 cors 中间件
app.use(cors()) // 将 cors 注册为全局中间件

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))

// 一定要在路由之前，封装 res.cc 函数
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 一定要在路由之前配置解析 Token 的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)// 注意：不以 /api 开头的接口，都需要进行 Token 身份认证
// 导入并使用文章分类路由模块
const movieRouter = require('./router/movie')
app.use('/movie', movieRouter)

// 定义错误级别的中间件
app.use(function (err, req, res, next) {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 身份认证失败后的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})
