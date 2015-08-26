var gulp = require('gulp');
var watch = require('gulp-watch');
var request = require('request');
var path = require('path');
var sass = require('gulp-sass');
var gutil = require('gulp-util');

gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch:sass', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('watch:static', function() {
  // Watch specific files for changes and trigger a livereload
  gulp.watch(["*.html", "css/*", "js/*"], function(event) {
    gutil.log('autoreload', event.path);
    request({
      url: 'http://localhost:3000/autoreload/notify',
      method: 'post',
      json: {
        files: [event.path]
      },
      strictSSL: false
    });
  });
});

gulp.task('watch', ['watch:static', 'watch:sass']);
gulp.task('build', ['sass']);
