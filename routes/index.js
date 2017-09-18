var express = require('express');
var app = express.Router();
var nodemailer=require('nodemailer');

var mymail='uietkuk.erp@gmail.com';
var mypass='anubhavsunil';


var MongoClient = require('mongodb').MongoClient;

function requireLogin (req, res, next) {
    if (!req.user) {
        console.log("not found");
        res.redirect('/');
    } else {
        console.log("found");
        next();
    }
}

app.get('/',function(req,res)
{
    res.render('index');
});

app.get('/logout', function(req, res) {
    req.session.reset();
    res.redirect('/');
});


app.post('/login',function(req,res){
  console.log(req.session_state);
    var query={
        username:req.body.username,
        password:req.body.password
    }
    console.log(query);
    req.db.collection('login').find(query).toArray(function (err,objs)
    {
        if(err){
            console.log('Error'+err.toString);
            throw err;
        }
        if(objs.length===1) {
            // res.json({msg:"ok",data:objs[0]});

            req.session_state.user = objs[0];

            switch (objs[0].type)
            {
                case "teacher" :
                    res.json({msg: 'ok', addr : "/teacher_login"});
                    break;

                case "admin" :
                    res.json({msg: 'ok', addr : "/admin_login"});
                    break;
                case "student" :
                    res.json({msg: 'ok', addr : "/student_login"});
                    break;
                default :
                    res.json({msg:'Some Error Occurred'});
            }

        }
        else
            res.json({msg:'WRONG USERNAME OR PASSWORD'});
    });
    });
function sendMail(sub,data,to)
{

    console.log("sending mail");
    var mailOptions = {
        from: mymail,
        to: to,
        subject: sub,
        text: data
    };
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: mymail,
            pass: mypass
        }
    });


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send("done");
        }
    });


}
app.get('/send',function(req,res){
    sendMail("hi","test","suniljakhal.skj@gmail.com");
});

app.post("/forgotPass",function(req,res){

    var data = req.body;
    
        var query={
            rollno:data.rollno,
            email:data.email
        }

        req.db.collection('studentDetails').find(query).toArray(function (err,objs) {

            data=objs[0];
            if(objs.length===1){
                var query2 = {
                    username : data.rollno
                }
                req.db.collection("login").find(query2).toArray(function (err2, obj2) {

                    if(err2) {console.log(err2);
                        res.josn({msg:"SERVER ERROR"});
                        throw er;
                    }
                    if(objs.length===1) {
                        var data2 = obj2[0];
                        sendMail("your erp password", "Username: " + data2.username + " ,Password: " + data2.password, data.email);
                        res.json({msg: "ok"});
                        req.db.close();
                    }
                })
            }
            else
            {
                res.json({msg:"enter valid details"});
            }


        });
    })




function gernatePass()
{
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ!@#&*/+-abcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum,rnum+1);
    }
    return randomstring;
}

app.post("/registerStudent",function(req,res) {
    var data = req.body;

    var pass = gernatepass();

    var query = {
        rollno: data.rollno,
        email: data.email
    }

    req.db.collection('studentDetails').find({$or : [{ rollno : data.rollno } , { email : data.email } ] }).toArray(function (err, objs) {

        if (err) {
            console.log(err);
            res.josn({msg: "SERVER ERROR"});
            throw er;
        }

        data = objs[0];
        if (objs.length === 0) {
            var query2 = {
                username: data.rollno,
                type: "student"
            }
            req.db.collection("login").find(query2).toArray(function (err2, obj2) {
                if (err2) {
                    console.log(err2);
                    res.josn({msg: "SERVER ERROR"});
                    throw er;
                }
                if (obj2.length === 0) {
                    query2.password = pass;
                    req.db.collection("login").insertOne(query, function (err, data2) {
                        sendMail("your erp password", "Username: " + data2.username + " ,Password: " + data2.password, data.email);
                        res.json({msg: "ok"});
                        req.db.close();

                    })

                }
            })
        }
        else {
            res.json({msg: "user already exists"});
        }


    });
});


app.get('/:a',function (req,res) {
    console.log("hi25");
    res.render(req.params.a);

});



/**
 * Created by ANUBHAV on 08-Sep-17.
 */

module.exports = app;
