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

let createNewUser = async (req, res) => {
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('INSERT INTO `users`(first_name, last_name, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address]);
    return res.send('Hello haha');
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser
}