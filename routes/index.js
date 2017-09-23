var express = require('express');
var app = express.Router();
var mail = require("./email");



function requireLoginStudent (req, res, next) {
    if (!req.user && req.user.type !== "student") {
        console.log("not found");
        res.redirect('/');
    } else {
        console.log("found");
        next();
    }
}


function requireLoginTeacher (req, res, next) {
    if (!req.user && req.user.type !== "teacher") {
        console.log("not found");
        res.redirect('/');
    } else {
        console.log("found");
        next();
    }
}



function requireLoginAdmin (req, res, next) {
    if (!req.user && req.user.type !== "admin") {
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
  console.log(req.body);
    var query={
        username:req.body.username,
        password:req.body.password
    };
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

        req.db.close();
    });

    });


app.get('/send',function(req,res){
    mail.sendMail("hi","test","gupta.anubhav25@gmail.com");
});

app.post("/forgotPass",function(req,res){

    var data = req.body;

        var query={
            username:data.rollno,
            email:data.email
        };
    //console.log(query);
        req.db.collection("login").find(query).toArray(function (err, objs) {

                    if(err) {console.log(err);
                        res.json({msg:"SERVER ERROR"});
                        throw err;
                    }

                    if(objs.length===1) {
                        var data2 = objs[0];
                        mail.sendMail("your erp password", "Username: " + data2.username + " ,Password: " + data2.password, data2.email);
                        res.json({msg: "ok"});

                    }
                    else
                    {
                        res.json({msg:"enter valid details"});
                    }

            req.db.close();
        });
    });


app.post("/changePass",function(req,res) {

    var data = req.body;

    var query = {
        username: data.username,
        email : data.email,
        password :  data.oldpassword
    };

    var query2 = {
        password :  data.newpassword
    };
    req.db.collection("login").updateOne( query, query2 ,function (err2, obj2) {
        if (err2) {
            console.log(err2);
            res.json({msg: "SERVER ERROR"});
            throw err2;
        }

            req.db.collection("login").insertOne(query2, function (err, data2) {

                mail.sendMail("your new erp password", "Username: " + query.username + " ,Password: " + query2.password, query.email);
                res.json({msg: "ok"});
                req.db.close();

            })
        })
});



function gernatePass()
{
    var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = '';
    for (var i=0; i<string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.charAt(rnum);
    }
    return randomstring;
}



app.post("/registerStudent",function(req,res) {
    var data = req.body;

    var pass = gernatePass();

            var query2 = {
                username: data.rollno,
                email : data.email,
                type: "student"
            }
            req.db.collection("login").find(    {   $or : [query2, { username : data.rollno ,  type: "student"} ,
                                                        { email : data.email , type: "student"}, query2 ]
                                                }).toArray(function (err2, obj2) {
                if (err2) {
                    console.log(err2);
                    res.json({msg: "SERVER ERROR"});
                    throw err2;
                }
                if (obj2.length === 0) {
                    query2.password = pass;
                    req.db.collection("login").insertOne(query2, function (err, data2) {

                        mail.sendMail("your erp password", "Username: " + query2.username + " ,Password: " + query2.password, query2.email);
                        res.json({msg: "ok"});


                    })


                }
                else {
                    res.json({msg: "user already exists"});
                }
                req.db.close();
            })

});

var fs = require('fs');
var teacher_notifications = [] ;
var student_notifications = [] ;
fs.readFile('./teacher_notifications',function(err,data){
try {
    teacher_notifications = JSON.parse(data);
}
catch (e){}
});

fs.readFile('./student_notifications','UTF-8',function(err,data){
    try{
student_notifications = JSON.parse(data);
    }
    catch (e){}
});

app.post('/add_notification',function (req,res) {
    var data = req.body;
    if(data.target === 'all')
    {
        if(teacher_notifications.length === 20)
        {
            teacher_notifications.shift();
        }
        teacher_notifications.push(data);
        fs.writeFile('./teacher_notifications',JSON.stringify(teacher_notifications));
        if(student_notifications.length === 20)
        {
            student_notifications.shift();
        }
        student_notifications.push(data);
    }
    if(data.target === 'teacher')
    {
        if(teacher_notifications.length === 20)
        {
            teacher_notifications.shift();
        }
        teacher_notifications.push(data);
    }
    if(data.target === 'student')
    {
        if(student_notifications.length === 20)
        {
            student_notifications.shift();
        }
        student_notifications.push(data);
    }
    fs.writeFile('./teacher_notifications',JSON.stringify(teacher_notifications),function () {
        
    });
    fs.writeFile('./student_notifications',JSON.stringify(student_notifications),function () {
        
    });
    res.end();

});



app.get('/get_student_notification',function (req,res) {
    res.json(student_notifications);
});

app.get('/get_teacher_notification',function (req,res) {
    res.json(teacher_notifications);
});


app.post('/result',function (req,res) {

    var sem = req.body.sem;
    var rno = req.user.username;

    var buff = new Buffer(sem);
   sem = buff.toString('base64');

    buff = new Buffer(rno);
    rno = buff.toString('base64')
var a={};
    a.msg = 'ok';
    a.url = "http://49.50.77.75/Forms/Student/PrintReportCard.aspx?rollno="+rno+"&sem="+sem;

    res.json(a);

});
app.get('/myusername',function(req,res){
    res.send(req.user.username);
});


app.get("/favicon.ico", function (req,res) {
    res.end();
});
app.get('/:a',function (req,res) {
   // console.log("hi25");
    res.render(req.params.a);

});



/**
 * Created by ANUBHAV on 08-Sep-17.
 */

module.exports = app;
