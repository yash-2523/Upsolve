const express = require('express')
const compression = require('compression')
const app = express();
require('./models')
const bodyparser = require('body-parser');

app.use(bodyparser.json());
app.use(compression());
app.use(bodyparser.urlencoded({extended: true}));

const api = require('./api')
app.use('/api', api)

app.use(express.static('./public'));

app.listen(3000, ()=>{
    console.log("Server started...");
})