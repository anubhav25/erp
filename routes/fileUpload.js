/**
 * Created by ANUBHAV on 21-Sep-17.
 */

var multer = require('multer');
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname+"/userpics");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + req.user.username);
    }
});

var upload = multer({ storage: Storage }).array("img", 1); //Field name and max count



function uploadimg(req,res) {
    upload(req, res, function (err) {
        if (err) {

        }
        console.log("File uploaded sucessfully!.");
    });
}

module.exports.upload = uploadimg ;
