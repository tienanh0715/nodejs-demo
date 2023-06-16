import connection from '../configs/connectDB'

let getHomePage = (req, res) => {
    let data = [];

    connection.query(
        'SELECT * FROM `users` ',
        function (err, results, fields) {
            console.log(results); // results contains rows returned by server
            results.map((row) => {
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

    );
}

module.exports = {
    getHomePage
}