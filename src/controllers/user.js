const db = require('../configs/db')
const { queryWhere, queryLimit, queryStartEnd, querySort } = require('../utils/userQuery')

const userController = {
    //GET /user
    getAllUser(req, res) {
        let query = req.query
        let queryLength = Object.keys(query).length
        let sql = "SELECT * FROM user"
        console.log("QUERY: ", query);
        if (queryLength > 0) {
            sql = queryWhere(sql, query)
            sql = querySort(sql, query)
            sql = queryLimit(sql, query)
            sql = queryStartEnd(sql, query)
        }
        console.log("SQl: ", sql);
        db.query(sql.split("LIMIT")[0].replace("*", "COUNT(*) as count"), (err, result) => {
            if (err) res.status(400).json([])
            req.pagination_total = result[0].count
        })
        db.query(sql, (err, result) => {
            if (err) res.status(400).json([])
            res.status(200).json({
                total: result?.length,
                pagination_toal: req.pagination_total,
                data: result
            })
        })
    },

    //GET /user/:id
    getUserById(req, res) {
        let id = req.params.id
        let sql = "SELECT * FROM user WHERE id = ?";
        db.query(sql, [id], (err, result) => {
            if (err) res.status(400).json([])
            res.status(200).json(result)
        })
    },

    //POST /user/:id
    deleteUser(req, res) {
        let id = req.params.id
        let sql = `DELETE FROM user WHERE id = ${id}`;
        db.query(sql, function (err, result) {
            if (err) res.status(400).json([])
            res.status(200).json(result)
        });
    },

    //POST /user/:id  +body
    updateUser(req, res) {
        let id = req.params.id
        let body = req.body;
        let sql = `UPDATE user SET username = '${body.username}', password = '${body.password}', role=${body.role} WHERE id = ${id}`;
        db.query(sql, function (err, result) {
            if (err) res.status(400).json([])
            res.status(200).json(result)
        });
    }
}

module.exports = userController