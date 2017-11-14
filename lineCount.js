
var readDirFiles = require('read-dir-files');
var fs= require('fs'); 


  readDirFiles.read('./public','utf-8', function (err, files) {
    if (err) return console.log(err);
   // console.log(files);
    for( var i in files){
    	console.log(i);
    	try{
    	var	min=files[i];
}
catch(e){
console.log(e);
}
try{
  //console.log(min); 
 //var c= min.search('\<n></n>');
  //console.log(c);


    }
catch(e){
console.log(e);
}
}
  

  });




