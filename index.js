const express = require('express')
const compression = require('compression')
const app = express();

const cors = require('cors');
require('./models')
const bodyparser = require('body-parser');
app.use(cors());
app.use(bodyparser.json());
app.use(compression());
app.use(bodyparser.urlencoded({extended: true}));

const api = require('./api')
app.use('/api', api)

app.use(express.static('./upsolve/build'));

app.listen(4000, ()=>{
    console.log("Server started...");
})