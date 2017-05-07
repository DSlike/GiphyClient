var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require('gulp-uglify'),
    watch = require('gulp-watch');

gulp.task('devAssemble', function() {
  return watch('./app/separated/*.js', function () {
    gulp.src([
                './app/separated/top.js',
                './app/separated/app.js',
                './app/separated/mainPage.js',
                './app/separated/myCollection.js',
                './app/separated/upload.js',
                './app/separated/routes.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./app/'));
      });
});
