const express = require('express')
const router = express.Router()

// 导入用户路由处理函数模块
const movieHandler = require('../router_handler/movie')

// 获取本周上映的电影信息
router.get('/week', movieHandler.getMovieWeek)
// 获取即将上映的电影信息
router.get('/soon', movieHandler.getMovSoon)
// 获取最高票房的电影信息
router.get('/top', movieHandler.getMovieTop)

// 根据movieID获取某部电影的详细信息(放映时长、导演)
router.get('/detail/:movieId', movieHandler.getMovieDetail)
// 根据movieID获取某部电影的基本信息(评分、类型、海报)
router.get('/info/:movieId', movieHandler.getMovieInfo)
// 根据movieID获取这部电影的排片信息
router.get('/schedule/:movieId', movieHandler.getMovSchedule)
// 获取全部的排片信息
router.post('/schedule', movieHandler.getHallSchedule)
// 获取全部的影院电影信息
router.post('/info', movieHandler.getHallMovie)
// 更新某部电影是否想看
router.post('/isCollect', movieHandler.updateCollect)
// 查看收藏的场次信息
router.get('/collect/schedule', movieHandler.getCollectSchedule)

module.exports = router
