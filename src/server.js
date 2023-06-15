import express from 'express'
import configViewEngine from './configs/viewEngine';
import dotenv from 'dotenv';
dotenv.config();

var app = express();
var port = process.env.PORT || 3001;

configViewEngine(app);

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})