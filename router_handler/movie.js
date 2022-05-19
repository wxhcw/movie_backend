// 导入数据库操作模块
const db = require('../db/index')
const url = require("url");

// 获取本周上映和最高票房的电影信息
exports.getMovieWeek = (req, res) => {
    const sql = 'select * from mov_week'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取本周上映的电影信息成功！',
            data: results,
        })
    })
}
//获取最高票房的电影信息
exports.getMovieTop = (req, res) => {
    const sql = 'select * from mov_top'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取最高票房的电影信息成功！',
            data: results,
        })
    })
}
// 获取即将上映的电影信息
exports.getMovSoon = (req, res) => {
    const sql = 'select * from mov_soon'
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取即将上映的电影信息成功！',
            data: results,
        })
    })
}
// 根据ID获取某部电影的详细信息(放映时长、导演)
exports.getMovieDetail = (req, res) => {
    const sql = `select * from mov_detail where movie_id = '${req.params.movieId}'`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取的电影详情成功！',
            data: results,
        })
    })
}
// 根据ID获取某部电影的基本信息(评分、类型、海报)
exports.getMovieInfo = (req, res) => {
    const sql = `select * from movie where movie_id = '${req.params.movieId}'`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取的电影详情成功！',
            data: results,
        })
    })
}
// 获取全部的排片信息
exports.getHallSchedule = (req, res) => {
    let { queryName, currentPage, pageSize } = req.body //获取分页信息
    const sqlTotal = `SELECT count(*) total from mov_schedule 
                        LEFT JOIN movie USING (movie_id) 
                        where movie_name LIKE '%${queryName}%'`

    db.query(sqlTotal, (err, results) => {
        if (err) return res.cc(err)
        let data = {
            totalCount: 0,
            results: []
        }
        data.totalCount = results[0].total  //获取排片信息总条数

        const sql = `SELECT * from mov_schedule 
                        LEFT JOIN movie USING (movie_id) 
                        where movie_name LIKE '%${queryName}%' 
                        limit ${(currentPage - 1) * pageSize},${pageSize}`

        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            data.results = results  //获取电影信息
            res.send({
                status: 0,
                message: '获取排片信息成功！',
                data,
            })
        })
    })
}
// 获取影院的全部电影信息
exports.getHallMovie = (req, res) => {
    let { queryName, currentPage, pageSize } = req.body //获取分页信息
    const sqlTotal = `select count(*) total from movie
        where movie_name like '%${queryName}%'`
    db.query(sqlTotal, (err, results) => {
        if (err) return res.cc(err)
        let data = {
            totalCount: 0,
            results: []
        }
        data.totalCount = results[0].total  //获取电影总条数

        const sql = `select * from movie
                    where movie_name like '%${queryName}%'
                    limit ${(currentPage - 1) * pageSize},${pageSize}`

        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            data.results = results  //获取电影信息
            res.send({
                status: 0,
                message: '获取影院电影信息成功！',
                data,
            })
        })
    })
}
// 根据movieID获取这部电影的排片信息
exports.getMovSchedule = (req, res) => {
    const sql = `select * from mov_schedule where movie_id = '${req.params.movieId}'`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取电影的排片详情成功！',
            data: results,
        })
    })
}

// 更新某场次是否收藏
exports.updateCollect = (req, res) => {
    let { isCollect, scheduleId } = req.body
    const sql = `update mov_schedule set schedule_isCollect=${isCollect} where schedule_id='${scheduleId}'`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: isCollect ? '收藏场次成功！' : '取消收藏成功',
        })
    })
}
// 查看收藏的场次信息
exports.getCollectSchedule = (req, res) => {
    const sql = `SELECT * from mov_schedule 
                    LEFT JOIN movie USING (movie_id) 
                    where schedule_isCollect=1`
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: '获取收藏的场次信息成功',
            data: results,
        })
    })
}