import pool from '../configs/connectDB'

let getAllUsers = async (req, res) => {
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

    return res.status(200).json({
        message: 'ok',
        data: data
    })
}

let createNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    if (!firstName || !lastName || !email || !address) {
        return res.status(200).json({
            message: 'missing required params',
        })
    }

    await pool.execute('INSERT INTO `users`(first_name, last_name, email, address) values (?, ?, ?, ?)', [firstName, lastName, email, address]);

    return res.status(200).json({
        message: 'ok',
    })
}

let updateUser = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body;

    if (!firstName || !lastName || !email || !address || !id) {
        return res.status(200).json({
            message: 'missing required params',
        })
    }

    await pool.execute('UPDATE `users` SET first_name = ?, last_name = ?, email = ?, address = ? WHERE id = ?', [firstName, lastName, email, address, id]);

    return res.status(200).json({
        message: 'ok',
    })
}

let deleteUser = async (req, res) => {
    let id = req.params.id;

    await pool.execute('DELETE FROM `users` WHERE id = ?', [id]);

    return res.status(200).json({
        message: 'ok',
    })
}

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}