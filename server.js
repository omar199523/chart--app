const express = require("express");
const colors = require("colors");
const dotenv = require('dotenv').config()

const port =process.env.PORT ||  5000;
const {dbConnect} =require('./config/db')

const app = express();
dbConnect();
app.use(express.json());
app.use(express.urlencoded({extended :false}));
app.use('/api/tokens',require('./routes/tokenRoute'))

const {fetchData} = require('./controller/queryFun')

setInterval(()=>{
    fetchData()
},60*1000)
app.listen(port, () => {
    console.log(`sarver stared on port ${port}`)
    

});
