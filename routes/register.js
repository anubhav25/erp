var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/erp";

module.exports = router;


function gernatePass()
{
    return "anubhav";
}

router.post("/registerStudent",function(req,res)
{
    var data = req.body;
    var pass = gernatePass();



    MongoClient.connect(url,function (err,db) {
        if(err)throw err;

        var query={
            rollno:data.rollno
        }

        db.collection('studentDetails').find(query).toArray(function (err,objs) {

            if(err)
            {
                console.log(err);
                throw er;
            }
            if(objs.length===0){
                data.pass=pass;
                sendMail("your erp password","Username: "+data.rollno+" ,Password: "+data.pass,data.email);
                db.collection('studentDetails').insertOne(data,function(err,user) {

                    if(err) {console.log(err);
                        res.josn({msg:"SERVER ERROR"});
                        res.end();
                        throw er;}
                    res.json({msg:"ok"});
                    res.end();
                });
            }
            else
            {
                res.json({msg:"user already exists"});
            }

            db.close();
        });
    });
});

