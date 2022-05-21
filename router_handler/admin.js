// 导入数据库操作模块
const db = require('../db/index')
const url = require("url");

// 更新电影基本信息 post update
exports.updateMovInfo = (req, res) => {
    const sql = "update movie set ? where movie_id=?"
    db.query(sql, [req.body, req.body.movie_id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新电影基本信息失败')
        return res.cc('更新电影基本信息成功！', 0)
    })
}
// 删除电影基本信息 get delete
exports.delMovInfo = (req, res) => {
    const sql = `DELETE FROM movie WHERE movie_id = '${req.params.movieId}'`
    db.query(sql, (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除电影基本信息失败')
        // 修改用户信息成功
        return res.cc('删除电影基本信息成功！', 0)
    })
}
// 添加电影基本信息 post insert
exports.insertMovInfo = (req, res) => {
    const sqlInsert = 'insert into movie set ?'
    db.query(sqlInsert, req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加电影基本信息失败')
        return res.cc('添加电影基本信息成功！', 0)
    })
}
// 根据用户ID获取订单信息
exports.getAllOrderInfo = (req, res) => {
    let { queryName, queryUsername, queryHall, currentPage, pageSize } = req.body //获取分页信息
    const sqlTotal = `SELECT count(*) total
                FROM user_orders LEFT JOIN movie USING ( movie_id )
	            LEFT JOIN mov_schedule USING ( schedule_id )
	            LEFT JOIN user USING ( customer_id )
                where movie_name like '%${queryName}%'
                and username like '%${queryUsername}%'
                and schedule_hall like '%${queryHall}%'`

    db.query(sqlTotal, (err, results) => {
        if (err) return res.cc(err)
        let data = {
            totalCount: 0,
            results: []
        }
        data.totalCount = results[0].total  //订单总数
        const sql = `SELECT movie_name,	username, count, total_price, order_time, schedule_hall, movie_time, movie_poster
                    FROM user_orders LEFT JOIN movie USING ( movie_id )
                    LEFT JOIN mov_schedule USING ( schedule_id )
                    LEFT JOIN user USING ( customer_id )
                    where movie_name like '%${queryName}%'
                    and username like '%${queryUsername}%'
                    and schedule_hall like '%${queryHall}%'
                    limit ${(currentPage - 1) * pageSize},${pageSize}`
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            data.results = results  //获取订单信息
            res.send({
                status: 0,
                message: '获取订单信息成功！',
                data,
            })
        })
    })
}
exports.getAllUserInfo = (req, res) => {
    let { queryUsername, currentPage, pageSize } = req.body //获取分页信息
    const sqlTotal = `SELECT count(*) total FROM user
                    where  username like '%${queryUsername}%'`
    db.query(sqlTotal, (err, results) => {
        if (err) return res.cc(err)
        let data = {
            totalCount: 0,
            results: []
        }
        data.totalCount = results[0].total  //订单总数
        const sql = `SELECT username, avatar, email, motto, isAdmin FROM user
                    where  username like '%${queryUsername}%'
                    limit ${(currentPage - 1) * pageSize},${pageSize}`
        db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            data.results = results  //获取用户信息
            res.send({
                status: 0,
                message: '获取用户信息成功！',
                data,
            })
        })
    })
}