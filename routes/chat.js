
module.exports = function(server) {
    var io = require('socket.io').listen(server);
    var fs = require('fs');
    var mongo = {};
    require('./db')(mongo, function (err) {

        if (err)
            throw err;

        io.on('connection', function (socket) {
            // console.log("user connected");
            mongo.db.collection('chats').find({}).limit(20).toArray(function (err, objs) {
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
