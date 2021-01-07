const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require("dotenv").config();
app.use(bodyParser.json())

const River = require('./models/riverModel');


const port = 3000 || process.env.PORT

/******************Routes****************** */
app.post('/', async (req, res) => {

    try {
        const {
            VOR,
            VOM,
            WOR,
            theta
        } = req.body
        let time;
        if (theta < 90) {
            time = WOR / (VOM * Math.sin(theta))
        } else {
            time = WOR / ((VOM - VOR) * Math.cos(theta))
        }

        const riverdata = await River.create({
            VOR,
            VOM,
            WOR,
            theta,
            time
        });;
        console.log(riverdata)
        res.json(riverdata)
    } catch (err) {
        res.json({
            message: err
        });
    };

});

/************************CONNECT TO DB*************************** */
mongoose.connect(
    process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
    },
    () => {
        console.log("Connected");
    }
);

// 8770659619
/***************************SERVER************************ */
app.listen(port, () => console.log(`Server is running on port ${port}`));