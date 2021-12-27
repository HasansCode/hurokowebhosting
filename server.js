const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// const path = require('path');

// this is setup our enviroment
require('dotenv').config();
// this is our server port
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;


mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


mongoose.connection.on('error',(error)=>{
    console.log("ERROR" + error);
});
mongoose.connection.once('open', ()=>{
console.log("mongoDB Start working");

});

const jobsRouter = require('./routes/jobsCRUD');
app.use('/api/jobs', jobsRouter);


// app.use('/getjobnamesearch',(req,res,next)=>{
//     const searchField = req.query.name;
//     mongoose.getCollection('jobs').find({jobName:{$regex: searchField, $options: '$i'}})
//     .then(data=>{
//         res.send(data)
//         console.log(data);
//     })

// })
// var authColl = mongoose.connection.getCollection("jobs")
// app.get('/searchname',(req,res,next)=>{
//     const textForSearch = "vir"
//     authColl.find({jobname:{$regx: textForSearch,$options: '$i'}}).then(data=>{
//         res.send(data);
//     })
// })


if(process.env.NODE_ENV == "production"){
    app.use(express.static('forntend/build'))
}



app.listen(port, ()=>{
    console.log(`server runing on localhost${port}`);
})