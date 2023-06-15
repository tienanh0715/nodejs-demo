import express from 'express'
import configViewEngine from './configs/viewEngine';
import dotenv from 'dotenv';
dotenv.config();
import initWebRoute from './route/web'

var app = express();
var port = process.env.PORT || 3001;

configViewEngine(app);

initWebRoute(app);

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`)
})