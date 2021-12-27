const router= require('express').Router();
let Jobs = require('../models/jobs.model');


router.route('/').get((req, res)=>{
    Jobs.find((err, doc)=>{
        if(err){
            console.log("Hello Emon I found problem in"+ err);
            res.status(500).json({message: "problem in get router"})
        }
        else{
            console.log("Get request work fine");
            res.status(200).json(doc);
        }
    })
})




router.post('/post',(req, res)=>{
    
    const input = req.body;
    const newDocument = new Jobs({
        jobName: input.jobName,
        companyName: input.companyName,
        companyAddress: input.companyAddress,
        requireSkills: input.requireSkills,
        jobType: input.jobType,
        requireExperience: input.requireExperience,
        applicationLastDate: input.applicationLastDate,
        description: input.description
    });
    // saving inforemation on database
    newDocument.save((err, doc)=>{
    if(err){
        console.log("something problem ");
        res.status(500).json({message: "Something bad happened please check CRUD.js"});
    }
    else{
        console.log("Every thing fine");
        res.status(200).json({message: "Jobs created"});
    }
    });
})

// router.get('/search/:jobName',(req,res)=>{
//     // const searchField = req.query.name;
//     var regex = new RegExp(req.params.jobName,'i')
//     Jobs.find({jobName: regex}).then(data=>{
//                 res.status(444).json(data)
                
//             })
// }
router.route('/results').get((req,res)=>{
    const searchField = req.query.search_query;
    
    /* /results lekhar pore '?search_query' lektehobe tarpore '=' diye search text lekte hobe*/
    Jobs.find({jobName:{$regex:searchField, $options: '$i'}}).then(data=>{
       res.status(200).json(data)
                        
       })
})
module.exports = router;