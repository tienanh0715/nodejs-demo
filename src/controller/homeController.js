import pool from '../configs/connectDB'

let getHomePage = async (req, res) => {
    let data = [];

    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    rows.map((row) => {
        data.push({
            id: row.id,
            firstName: row.first_name,
            lastName: row.last_name,
            email: row.email,
            address: row.address
        })
    })
    return res.render('index.ejs', { dataUser: data });
}

let getDetailPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM `users` where `id` = ?', [id]);
    return res.send(JSON.stringify(user))
}

module.exports = {
    getHomePage,
    getDetailPage
}