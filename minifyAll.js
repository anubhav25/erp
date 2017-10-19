var htmlminify = require('html-minify');
var minify = require('html-minifier');
var readDirFiles = require('read-dir-files');
var fs= require('fs'); 


  readDirFiles.read('./myviews','utf-8', function (err, files) {
    if (err) return console.log(err);
   // console.log(files);
    for( var i in files){
    	console.log(i);
    	try{
    		min=files[i];
    var min = htmlminify.minify(min);
}
catch(e){
console.log(e);
}
try{
	var result = minify.minify(min,{
	removeAttributeQuotes: true,
	collapseWhitespace : true,
	conservativeCollapse : true
	});

	fs.writeFileSync("./myviews/"+i, result);
    }
catch(e){
console.log(e);
}
}
  

  });




