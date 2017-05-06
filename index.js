var express = require("express"),
    app = express(),
    gulp = require("gulp"),
    uglify = require('gulp-uglify'),
    pipe = require('gulp-pipe');

var port = process.env.PORT || 3000;
app.listen(port, function() {
     console.log("Listening on " + port);
});

app.get("/:f?", function(req, res){
     if(!req.params.f){
          res.sendFile(__dirname+"/index.html");
     }
});
