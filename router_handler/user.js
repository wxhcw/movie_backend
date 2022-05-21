const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')
// 导入配置文件
const config = require('../config')

// 注册用户的处理函数 post insert
exports.regUser = (req, res) => {
    let { customer_id, username, password, confirmPwd } = req.body
    const sql = `select * from user where username ='${username}'`
    db.query(sql, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.cc(err)
        }
        if (password !== confirmPwd) {
            return res.cc('两次密码不一致')
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        password = bcrypt.hashSync(password, 10)

        const sqlInsert = 'insert into user set ?'
        db.query(sqlInsert, { customer_id, username, password }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.cc(err)
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
                return res.cc('注册用户失败，请稍后再试！')
            }
            // 注册成功
            res.cc('注册成功！', 0)
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    const { username, password } = req.body
    const sql = `select * from user where username = '${username}'`
    db.query(sql, function (err, results) {
        if (err) return res.cc(err)
        // 执行 SQL 语句成功，但是查询到数据条数不等于 1
        if (results.length !== 1) return res.cc('查无此用户！')
        // 拿着用户输入的密码,和数据库中存储的密码进行对比

        const compareResult = bcrypt.compareSync(password, results[0].password)
        // 如果对比的结果等于 false, 则证明用户输入的密码错误
        if (!compareResult) {
            return res.cc('用户名与密码不一致！')
        }

        // 剔除完毕之后，user 中只保留了用户的 customer_id, username, email, isAdmin 这四个属性的值
        const user = { ...results[0], password: '', motto: '', avatar: '' }
        // 登录成功，生成 Token 字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '24h', // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            role: results[0].isAdmin,
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })
}
