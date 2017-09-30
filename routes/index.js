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
    var myUser =   req.user ;
    if(myUser && myUser.type) {
        switch (myUser.type) {
            case "teacher" :
                res.render("teacher_login");
                break;

            case "admin" :
                res.render("admin_login");
                break;
            case "student" :
                res.render("student_login");
                break;
            default :
                res.render('index');
        }
    }
    else
    res.render('index');
});

app.get('/logout', function(req, res) {
    req.session.reset();
    res.redirect('/');
});


app.post('/login',function(req,res){
    var query={
        username:req.body.username,
        password:req.body.password
    };
    req.db.collection('login').find(query, { _id: 0 }).toArray(function (err,objs)
    {

        if(err){
            console.log('Error'+err.toString);
            throw err;
        }
        console.log(objs);
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


app.get('/files/:a/:b',function (req,res) {
    res.download("./UserFiles/chatFiles/"+req.params.a,req.params.b);
});

app.get('/notifications/:a/:b',function (req,res) {
    res.download("./UserFiles/notifications/"+req.params.a,req.params.b);
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
        req.db.collection("login").find(query, { _id: 0 }).toArray(function (err, objs) {

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
                                                }, { _id: 0 }).toArray(function (err2, obj2) {
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



app.post('/result',function (req,res) {

    var sem = req.body.sem;
    var rno = req.user.username;

    var buff = new Buffer(sem);
   sem = buff.toString('base64');

    buff = new Buffer(rno);
    rno = buff.toString('base64');

    var a={};
    a.msg = 'ok';
    a.url = "http://49.50.77.75/Forms/Student/PrintReportCard.aspx?rollno="+rno+"&sem="+sem;

    res.json(a);

});



app.post('/updateStudentDetails',function(req,res){

    var query = {
        email : req.body.email
    };
    req.db.collection('Students').find(query,{_id : 0}).toArray(function(err,objs){

        if(objs.length===1)
        {
            req.db.collection('Students').deleteOne(objs[0],function(err)
            {
                if(err)
                {
                    throw err;
                }
                req.db.collection('Students').insertOne(req.body,function(err,data)
                {
                    if(err)
                    {
                        res.json({msg:"ERROR OCCURRED"});
                        throw err;
                    }
                    res.json({msg:"ok"});
                });
            })

        }
        else
            res.json({msg:"USER DOES NOT EXISTS."});
    });


});


app.post('/updateTeacherDetails',function(req,res){

    var query = {
        email : req.body.email
    };
    req.db.collection('Teachers').find(query,{_id : 0}).toArray(function(err,objs){

        if(objs.length===1)
        {
            req.db.collection('Teachers').deleteOne(objs[0],function (err) {
                if(err)
                {
                    throw err;
                }


                req.db.collection('Teachers').insertOne(req.body,function(err,data)
                {
                    if(err)
                    {
                        res.json({msg:"ERROR OCCURRED"});
                        throw err;
                    }
                    res.json({msg:"ok"});
                });

            });
        }
        else
            res.json({msg:"USER DOES NOT EXISTS."});
    });


});



app.post('/setStudentDetails',function(req,res){

    var query = {
        email : req.body.email
    };
    req.db.collection('Students').find(query,{_id : 0}).toArray(function(err,objs){

        if(objs.length===0)
        {
            req.db.collection('Students').insertOne(req.body,function(err,data)
            {
                if(err)
                {
                    res.json({msg:"ERROR OCCURRED"});
                    throw err;
                }
                res.json({msg:"ok"});
            });
        }
        else
            res.json({msg:"USER ALREADY EXISTS."});
    });


});
app.post('/setTeacherDetails',function(req,res){

    var query = {
        email : req.body.email
    };
    req.db.collection('Teachers').find(query,{_id : 0}).toArray(function(err,objs){

        if(objs.length===0)
        {
            req.db.collection('Teachers').insertOne(req.body,function(err,data)
            {
                if(err)
                {
                    res.json({msg:"ERROR OCCURRED"});
                    throw err;
                }
                res.json({msg:"ok"});
            });
        }
        else
            res.json({msg:"USER ALREADY EXISTS."});
    });


});




app.post('/assignLecture',function(req,res)
{



    req.db.collection('Lectures').insertOne(req.body,function(err)
    {
        if(err)
        {
            res.json({msg:"ERROR OCCURRED"});
            throw err;
        }
        res.json({msg:"ok"});
    })



});

app.post('/removeLecture',function(req,res)
{

    req.db.collection('Lectures').deleteOne(req.body,function(err)
    {
        if(err)
        {
            res.json({msg:"ERROR OCCURRED"});
            throw err;
        }
        res.json({msg:"ok"});
    })



});
app.get('/getLecture/:username',function(req,res)
{
    var query ={
        email : req.params.username
    }
    req.db.collection('Lectures').find(query,{_id:0}).toArray(function(err,data){
        if(err)
        {
            res.json({msg:"ERROR OCCURRED"});
            throw err;
        }
        res.json(data);
    });
});







app.post('/deleteStudent',function(req,res){

    var query = {
        email : req.body.email
    };
    req.db.collection('Students').find(query,{_id : 0}).toArray(function(err,objs){

        if(objs.length===1)
        {
            req.db.collection('Students').deleteOne(query,function(err,data)
            {
                if(err)
                {
                    res.json({msg:"ERROR OCCURRED"});
                    throw err;
                }
                res.json({msg:"ok"});
            });
        }
        else
            res.json({msg:"USER DOES NOT EXISTS."});
    });


});
app.post('/deleteTeacher',function(req,res){

    var query = {
        email : req.body.email
    };
    req.db.collection('Teachers').find(query,{_id : 0}).toArray(function(err,objs){

        if(objs.length===1)
        {
            req.db.collection('Teachers').deleteOne(query,function(err,data)
            {
                if(err)
                {
                    res.json({msg:"ERROR OCCURRED"});
                    throw err;
                }
                res.json({msg:"ok"});
            });
        }
        else
            res.json({msg:"USER DOES NOT EXISTS."});
    });


});


app.get('/getTeacher/:a?',function (req,res) {
    var sk=parseInt(req.params.a);
    req.db.collection('Teachers').find({},{_id : 0}).skip(20*sk).limit(20).toArray(function ( err,objs){
     if(err)
     {
         res.json({msg:"ERROR OCCURRED"});
         throw err;
     }
     res.json(objs);
    })
});

app.get('/getStudentDetails/:a',function (req,res) {
    var emailId=(req.params.a);
    req.db.collection('Students').find({email:emailId},{_id : 0}).toArray(function ( err,objs){
     if(err)
     {
         res.json({msg:"ERROR OCCURRED"});
         throw err;
     }
     res.json(objs[0]);
    })
});



app.get('/getTeacherDetails/:a',function (req,res) {
    var emailId=(req.params.a);
    req.db.collection('Teachers').find({email:emailId},{_id : 0}).toArray(function ( err,objs){
        if(err)
        {
            res.json({msg:"ERROR OCCURRED"});
            throw err;
        }
        res.json(objs[0]);
    })
});

app.get('/getStudents/:a?',function (req,res) {
    var sk=parseInt(req.params.a);
    req.db.collection('Students').find({},{_id : 0}).skip(20*sk).limit(20).toArray(function ( err,objs){
        if(err)
        {
            res.json({msg:"ERROR OCCURRED"});
            throw err;
        }
        res.json(objs);
    })
});



app.get('/myusername',function(req,res){
    res.json(req.user.username);
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
