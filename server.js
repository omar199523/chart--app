const express = require("express");
const colors = require("colors");
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000;
const { dbConnect } = require('./config/db')

const app = express();
dbConnect().then(() => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use('/api/tokens', require('./routes/tokenRoute'))


    const { fetchData } = require('./controller/queryFun')
    const data = require('./tokenSource.json')
    // const Tokens = require('./models/tokenModels')
    // Tokens.deleteMany({}).then(() => { console.log("delet") })
    // data.slice(0, 3).map((token) => {
    //     const { name, status, symbol, address, network } = token
    //     Tokens.create({
    //         status,
    //         address,
    //         name,
    //         network,
    //         symbol
    //     })
    // })

    setInterval(() => {
        fetchData()
        console.log(`${new Date().getHours()}:${new Date().getMinutes()}`)
    }, 5 * 60 * 1000)
    app.listen(port, () => {
        console.log(`sarver stared on port ${port}`)


    });
})

