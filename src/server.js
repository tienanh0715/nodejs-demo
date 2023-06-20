import express from 'express'
import configViewEngine from './configs/viewEngine';
import dotenv from 'dotenv';
dotenv.config();
import initWebRoute from './route/web';
import initAPIRoute from './route/api';

var app = express();
var port = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configViewEngine(app);

initWebRoute(app);

initAPIRoute(app);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})