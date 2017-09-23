/**
 * Created by ANUBHAV on 23-Sep-17.
 */

module.exports = function(obj,next) {

    var url = "mongodb://localhost:27017/erp";
   // console.log(url);
    url = "mongodb://erp:qwerty@ds141434.mlab.com:41434/erp";
    /*
     var expressMongoDb = require('express-mongo-db');
     app.use(expressMongoDb(url));*/

    var MongoClient = require('mongodb').MongoClient;

    var connection = MongoClient.connect(url);

    connection
        .then(function (db) {

            obj.db = db ;
            next();
        })
        .catch(function (err) {
            connection = undefined;
            next(err);
        });


};