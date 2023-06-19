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
    let { firstName, lastName, email, address } = req.body;
    await pool.execute('INSERT INTO `users`(first_name, last_name, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address]);
    return res.redirect('/');
}

let deleteUser = async (req, res) => {
    let userId = req.body.userId;
    await pool.execute('DELETE FROM `users` WHERE id = ?', [userId]);
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [user] = await pool.execute('SELECT * FROM `users` where `id` = ?', [id]);
    let data = {
        id: user[0].id,
        firstName: user[0].first_name,
        lastName: user[0].last_name,
        email: user[0].email,
        address: user[0].address,
    }
    return res.render('update.ejs', { dataUser: data });
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;
    console.log(id + firstName + lastName + email + address)
    await pool.execute('UPDATE `users` SET first_name = ?, last_name = ?, email = ?, address = ? WHERE id = ?', [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    updateUser
}