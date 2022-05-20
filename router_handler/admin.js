// 导入数据库操作模块
const db = require('../db/index')
const url = require("url");

// 更新电影基本信息
exports.updateMovInfo = (req, res) => {
    const sql = "update movie set ? where movie_id=?"
    db.query(sql, [req.body, req.body.movie_id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新电影基本信息失败')
        return res.cc('更新电影基本信息成功！', 0)
    })
}
// 删除电影基本信息
exports.delMovInfo = (req, res) => {
    const sql = `DELETE FROM movie WHERE movie_id = '${req.params.movieId}'`
    db.query(sql, [req.body, req.body.movie_id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('删除电影基本信息失败')
        // 修改用户信息成功
        return res.cc('删除电影基本信息成功！', 0)
    })
}
// 添加电影基本信息
exports.insertMovInfo = (req, res) => {
    const sqlInsert = 'insert into movie set ?'
    db.query(sqlInsert, req.body, (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('添加电影基本信息失败')
        return res.cc('添加电影基本信息成功！', 0)
    })
}