
module.exports = function(server)
{
    var io = require('socket.io').listen(server);
    var mongo = {};
    require('./db')(mongo,function(err)
    {

        if(err)
            throw err;

        io.on('connection', function(socket){
           // console.log("user connected");
            mongo.db.collection('chats').find({}).limit(20).toArray(function(err,objs){
                objs.forEach(function(a){
                    console.log(a);
                    socket.emit('chat message', a)
                })
            });
            socket.on('chat message', function(msg){
              //  console.log(msg);
                mongo.db.collection('chats').insertOne(msg,function(){});
                io.emit('chat message', msg);

            });
            socket.on('disconnect',function () {
                console.log('user disconnect');
            })
        });


    });


}

/**
 * Created by ANUBHAV on 23-Sep-17.
 */
