
module.exports = function(server) {
    var io = require('socket.io').listen(server);
    var fs = require('fs');
    var fs = require('fs');
    var teacher_notifications = [] ;
    var student_notifications = [] ;
    var csea_notifications = [];
    var cseb_notifications = [];
    var ecea_notifications = [];
    var eceb_notifications = [];
    var me_notifications = [];
    var bt_notifications = [];


    function save_notification(data)
    {

        if(data.target === 'teachers')
        {
            if(teacher_notifications.length === 20)
            {
                teacher_notifications.shift();
            }
            teacher_notifications.push(data);
             fs.writeFile('./teacher_notifications',JSON.stringify(teacher_notifications),function () {

        });
        }
        if(data.target === 'students')
        {
            if(student_notifications.length === 20)
            {
                student_notifications.shift();
            }
            console.log(data);
            student_notifications.push(data);
            fs.writeFile('./student_notifications',JSON.stringify(student_notifications),function () {

        });
        }
        if(data.target === 'csea')
        {
            if(csea_notifications.length === 20)
            {
                csea_notifications.shift();
            }
            console.log(data);
            csea_notifications.push(data);
            fs.writeFile('./csea_notifications',JSON.stringify(csea_notifications),function () {

            });
        }
        if(data.target === 'cseb')
        {
            if(cseb_notifications.length === 20)
            {
                cseb_notifications.shift();
            }
            console.log(data);
            cseb_notifications.push(data);
            fs.writeFile('./cseb_notifications',JSON.stringify(cseb_notifications),function () {

            });
        }        if(data.target === 'ecea')
    {
        if(ecea_notifications.length === 20)
        {
            ecea_notifications.shift();
        }
        console.log(data);
        ecea_notifications.push(data);
        fs.writeFile('./ecea_notifications',JSON.stringify(ecea_notifications),function () {

        });
    }        if(data.target === 'eceb')
    {
        if(eceb_notifications.length === 20)
        {
            eceb_notifications.shift();
        }
        console.log(data);
        eceb_notifications.push(data);
        fs.writeFile('./eceb_notifications',JSON.stringify(eceb_notifications),function () {

        });
    }        if(data.target === 'me')
    {
        if(me_notifications.length === 20)
        {
            me_notifications.shift();
        }
        console.log(data);
        me_notifications.push(data);
        fs.writeFile('./me_notifications',JSON.stringify(me_notifications),function () {

        });
    }        if(data.target === 'bt')
    {
        if(bt_notifications.length === 20)
        {
            bt_notifications.shift();
        }
        console.log(data);
        bt_notifications.push(data);
        fs.writeFile('./bt_notifications',JSON.stringify(bt_notifications),function () {

        });
    }


    }


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

    fs.readFile('./csea_notifications',function(err,data){
        try {
            csea_notifications = JSON.parse(data);
        }
        catch (e){}
    });

    fs.readFile('./cseb_notifications','UTF-8',function(err,data){
        try{
            cseb_notifications = JSON.parse(data);
        }
        catch (e){}
    });

    fs.readFile('./ecea_notifications',function(err,data){
        try {
            ecea_notifications = JSON.parse(data);
        }
        catch (e){}
    });

    fs.readFile('./eceb_notifications','UTF-8',function(err,data){
        try{
            eceb_notifications = JSON.parse(data);
        }
        catch (e){}
    });

    fs.readFile('./me_notifications',function(err,data){
        try {
            me_notifications = JSON.parse(data);
        }
        catch (e){}
    });

    fs.readFile('./bt_notifications','UTF-8',function(err,data){
        try{
            bt_notifications = JSON.parse(data);
        }
        catch (e){}
    });



var mongo={};
    require('./db')(mongo, function (err) {

        if (err)
            throw err;

        io.on('connection', function (socket) {

            mongo.db.collection('chats').find({},{ _id: 0 }).limit(20).toArray(function (err, objs) {
                objs.forEach(function (a) {
                    if (a.link) {
                        console.log('file sent');
                        socket.emit('chat_file', a)
                    }
                    else {
                        console.log('message sent');
                        socket.emit('chat_message', a)
                    }

                })
            });





            socket.on('students',function(msg){
                socket.join('students');
               // console.log(student_notifications);
                student_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_notification_file',obj);
                    else
                        socket.emit('new_notification_text',obj);
                })
            });
            socket.on('teachers',function(msg){
                socket.join('teachers');
                //console.log(teacher_notifications);
                teacher_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_notification_file',obj);
                    else
                        socket.emit('new_notification_text',obj);
                })
            });


            socket.on('csea',function(msg){
                socket.join('csea');

                csea_notifications.forEach(function (obj) {
                    console.log('hi');
                         console.log(obj);
                    if(obj.fileName)
                        socket.emit('new_file_from_teacher',obj);
                    else
                        socket.emit('new_text_from_teacher',obj);
                })


            });
            socket.on('cseb',function(msg){
                socket.join('cseb');
                cseb_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_file_from_teacher',obj);
                    else
                        socket.emit('new_text_from_teacher',obj);
                })
            });

            socket.on('ecea',function(msg){
                socket.join('ecea');
                ecea_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_file_from_teacher',obj);
                    else
                        socket.emit('new_text_from_teacher',obj);
                })
            });
            socket.on('eceb',function(msg){
                socket.join('eceb');
                eceb_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_file_from_teacher',obj);
                    else
                        socket.emit('new_text_from_teacher',obj);
                })
            });

            socket.on('me',function(msg){
                socket.join('me');
                me_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_file_from_teacher',obj);
                    else
                            socket.emit('new_text_from_teacher',obj);
                })
            });
            socket.on('bt',function(msg){
                socket.join('bt');
                bt_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_file_from_teacher',obj);
                    else
                        socket.emit('new_text_from_teacher',obj);
                })
            });




            socket.on('new_file_from_teacher', function (data) {


                var fileName = Date.now() + '' + data.fileName;

                var base64 = require('file-base64');

                base64.decode(data.file,"./UserFiles/notifications/"+ fileName,function (err, output) {

                    if (err){
                        throw err;
                    }

                    delete data.file;
                    data.link = '/notifications/' + fileName;



                    io.to(data.target).emit('new_file_from_teacher',data);

                    save_notification(data);


                });
            });

            socket.on('new_text_from_teacher', function (data) {
                console.log(data);
                io.to(data.target).emit('new_text_from_teacher',data);
                save_notification(data);
            });


            socket.on('new_notification_file', function (data) {


                    var fileName = Date.now() + '' + data.fileName;

                    var base64 = require('file-base64');

                    base64.decode(data.file,"./UserFiles/notifications/"+ fileName,function (err, output) {

                        if (err){
                            throw err;
                        }

                        delete data.file;
                        data.link = '/notifications/' + fileName;


                        if(data.target==='teachers'){
                            io.to('teachers').emit('new_notification_file',data);

                            save_notification(data);
                        }
                        else if(data.target==='students'){
                            io.to('students').emit('new_notification_file',data);
                            save_notification(data);
                        }
                        else{
                            data.target='students'
                            io.to('students').emit('new_notification_file',data);
                            save_notification(data);

                            data.target='teachers'
                            io.to('teachers').emit('new_notification_file',data);
                            save_notification(data);

                        }



                    });






            });
            socket.on('new_notification_text', function (data) {

console.log(data);
                if(data.target=='all')
                {
                    data.target='students';
                    io.to('students').emit('new_notification_text',data);
                    save_notification(data);
                    data.target='teachers';
                }
                if(data.target==='teachers'){
                    io.to('teachers').emit('new_notification_text',data);
                    save_notification(data);
                }
                else if(data.target==='students'){
                    io.to('students').emit('new_notification_text',data);
                    save_notification(data);
                }



            });


            socket.on('chat_message', function (msg) {

               // console.log('msg recieved');
                mongo.db.collection('chats').insertOne(msg, function () {
                    io.emit('chat_message', msg);
                });


            });
            socket.on('chat_file', function (msg) {

                console.log('file recieved');

                var fileName = Date.now() + '' + msg.fileName;

                var base64 = require('file-base64');

                base64.decode(msg.file,"./UserFiles/chatFiles/"+ fileName,function (err, output) {

                    if (err){
                        throw err;
                    }

                    delete msg.file;
                    msg.link = '/files/' + fileName;
                    mongo.db.collection('chats').insertOne(msg, function () {
                        io.emit('chat_file', msg);

                    });

                });
                socket.on('disconnect', function () {
                    console.log('user disconnect');
                })
            });


        });

    });
}

/**
 * Created by ANUBHAV on 23-Sep-17.
 */
