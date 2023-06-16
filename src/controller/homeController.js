import connection from '../configs/connectDB'

let getHomePage = (req, res) => {
    let data = [];

    connection.query(
        'SELECT * FROM `users` ',
        function (err, results, fields) {
            console.log('---> check mysql: ');
            console.log(results); // results contains rows returned by server
            results.map((row) => {
                data.push({
                    id: row.id,
                    firstName: row.first_name,
                    latsName: row.last_name,
                    email: row.email,
                    address: row.address
                })
            })
            return res.render('index.ejs', { dataUser: JSON.stringify(data) });
        }

    );
}

module.exports = {
    getHomePage
}