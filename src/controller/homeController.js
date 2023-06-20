import pool from '../configs/connectDB'
import multer from 'multer';

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
    await pool.execute('UPDATE `users` SET first_name = ?, last_name = ?, email = ?, address = ? WHERE id = ?', [firstName, lastName, email, address, id]);
    return res.redirect('/');
}

let getUploadFilePage = (req, res) => {
    return res.render('uploadFile.ejs');
}

const upload = multer().single('profile_pic');

let uploadProfilePic = async (req, res) => {
    console.log(req.file)
    upload(req, res, function (err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }

        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}

module.exports = {
    getHomePage,
    getDetailPage,
    createNewUser,
    deleteUser,
    getEditPage,
    updateUser,
    getUploadFilePage,
    uploadProfilePic
}