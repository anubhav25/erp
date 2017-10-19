'use strict'
module.exports = function(grunt){

require('jit-grunt')(grunt);


  grunt.initConfig({
    clean: {
         temp: ['temp'],
         myviews : ['myviews']
       },
  /*  cleantemp: {
         tests: ['temp']
       },*/
       shell: {
           run: {
               command: 'node bin/www'
           },
           minify :{
             command : 'node minifyAll.js'
           }
       },

       copy: {
         main: {
           files: [
        /*     // includes files within path
             {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},
       */
             // includes files within path and its sub-directories
        /*     {expand: true, src: ['views/**'], dest: 'temp/'},
             {expand: true, src: ['public/**'], dest: 'temp/'}
       */
             // makes all src relative to cwd
             {expand: true, cwd: 'views/', src: ['**'], dest: 'temp/'},
             {expand: true, cwd: 'public/', src: ['**'], dest: 'temp/'}
/*
             // flattens results to a single level
             {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'},*/
           ],
         },
       },


       comboall: {
         default_options: {
           files: [{
             expand: true,
             src: ['*.html'],
             cwd: 'temp',
             dest: 'myviews'
           }]
         }
       },
       watch : {
         files: ['views/*.html','public/js/*.js','public/css/*.css'],
         //tasks:['cleanall','copy','comboall','cleantemp']
         tasks:['clean','copy','comboall','shell:minify','clean:temp']
       }

  })
  grunt.loadNpmTasks('grunt-combo-html-css-js');
  grunt.registerTask('default',['watch'])
  //grunt.registerTask('build',['cleanall','copy','comboall','cleantemp'])
  grunt.registerTask('build',['clean','copy','comboall','shell:minify','clean:temp'])
}
