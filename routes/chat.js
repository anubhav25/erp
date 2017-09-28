
module.exports = function(server) {
    var io = require('socket.io').listen(server);
    var fs = require('fs');
    var fs = require('fs');
    var teacher_notifications = [] ;
    var student_notifications = [] ;
    function save_notification(data)
    {
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



    var mongo = {};
    require('./db')(mongo, function (err) {

        if (err)
            throw err;

        io.on('connection', function (socket) {



            // console.log("user connected");
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

            socket.on('student',function(msg){
                socket.join('student');
                student_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_notification_file',obj);
                    else
                        socket.emit('new_notification_text',obj);
                })
            });
            socket.on('teacher',function(msg){
                socket.join('teacher');
                teacher_notifications.forEach(function (obj) {

                    if(obj.fileName)
                        socket.emit('new_notification_file',obj);
                    else
                        socket.emit('new_notification_text',obj);
                })
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

                        save_notification(data);
                        if(data.target==='teacher')
                            io.to('teacher').emit('new_notification_file',data);
                        else if(data.target==='student')
                            io.to('student').emit('new_notification_file',data);
                        else{
                            io.to('student').emit('new_notification_file',data);
                            io.to('teacher').emit('new_notification_file',data);

                        }



                    });






            });
            socket.on('new_notification_text', function (data) {
console.log(data);
                save_notification(data);
                if(data.target==='teacher')
                    io.to('teacher').emit('new_notification_text',data);
                else if(data.target==='student')
                    io.to('student').emit('new_notification_text',data);
                else{
                    io.to('student').emit('new_notification_text',data);
                    io.to('teacher').emit('new_notification_text',data);

                }


            });


            socket.on('chat_message', function (msg) {

                console.log('msg recieved');
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
