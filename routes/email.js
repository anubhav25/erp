/**
 * Created by ANUBHAV on 20-Sep-17.
 */

var nodemailer=require('nodemailer');

var mymail='uietkuk.erp@gmail.com';
var mypass='anubhavsunil'

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

module.exports.sendMail =sendMail;
