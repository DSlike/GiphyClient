var express = require("express"),
    app = express(),
    gulp = require("gulp"),
    uglify = require('gulp-uglify'),
    pipe = require('gulp-pipe');

app.use(function(req, res, next) {
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 next();
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
     console.log("Listening on " + port);
});

app.get("/my-collection", function(req, res){
          res.sendFile(__dirname+"/index.html");
});

app.get("/upload", function(req, res){
          res.sendFile(__dirname+"/index.html");
});

app.get("/:f?", function(req, res){
     if(!req.params.f)
          res.sendFile(__dirname+"/index.html");
     else
          res.sendFile(__dirname+"/"+req.params.f);
});

app.get("/:fo/:f", function(req, res){
     res.sendFile(__dirname+"/"+req.params.fo+"/"+req.params.f);
});
