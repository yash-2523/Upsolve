const express = require('express')
const compression = require('compression')
const app = express();
const dotenv = require('dotenv').config();
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


const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>{
    console.log("Server started...");
})