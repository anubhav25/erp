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

app.get('/dashboard', requireLogin, function(req, res) {
    console.log('in dashboard');
    res.render('admin_login');
});


app.post('/login',function(req,res){

  /*  MongoClient.connect(url,function (err,db) {
        var query={
            username:req.body.username,
            password:req.body.password
        }
        console.log(query);
        db.collection('adminDetails').find(query).toArray(function (err,objs)
        {
            if(err){
                console.log('Error'+err.toString);
                throw err;
            }
            if(objs.length===1)
                res.json({msg:"ok",data:objs[0]});
            else
                res.json({msg:'WRONG USERNAME OR PASSWORD'});
        });
    });*/
  console.log(req.session_state);
    var query={
        username:req.body.username,
        password:req.body.password
    }
    console.log(req.body);
    req.db.collection('login').find(query).toArray(function (err,objs)
    {

        if(err){
            console.log('Error'+err.toString);
            throw err;
        }
        if(objs.length===1) {
            // res.json({msg:"ok",data:objs[0]});

            req.session_state.user = objs[0];
            //res.redirect('/dashboard');}
            res.json({msg: 'ok'});
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
//console.log(transporter);

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

//var pass = gernatepass();



    MongoClient.connect(url,function (err,db) {
        if(err)throw err;

        var query={
            rollno:data.rollno,
            email:data.email
        }

        db.collection('studentDetails').find(query).toArray(function (err,objs) {

            if(err) {console.log(err);
                res.josn({msg:"SERVER ERROR"});
                throw er;}
            //console.log(objs);
            if(objs.length==1){
                data=objs[0];
                sendMail("your erp password","Username: "+data.rollno+" ,Password: "+data.pass,data.email);
                res.json({msg:"ok"});
                res.end();
            }
            else
            {
                res.json({msg:"enter valid details"});
            }

            db.close();
        });
    });
});



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

app.post("/registerStudent",function(req,res)
{
    var data = req.body;

    var pass = gernatepass();



    MongoClient.connect(url,function (err,db) {
        if(err)throw err;

        var query={
            rollno:data.rollno
        }

        db.collection('studentDetails').find(query).toArray(function (err,objs) {

            if(err) {console.log(err);
                throw er;}
            //console.log(objs);
            if(objs.length==0){
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

app.get('/:a',requireLogin,function (req,res) {
    console.log("hi25");
    res.render(req.params.a);

});



/**
 * Created by ANUBHAV on 08-Sep-17.
 */

module.exports = app;
