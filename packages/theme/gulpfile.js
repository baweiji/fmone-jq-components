'use strict';

var gulp = require('gulp');
var postcss = require('gulp-postcss');
var cssmin = require('gulp-cssmin');

gulp.task('compile', function() {
  return gulp.src('./index.css')
    //.pipe(postcss())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist'));
});

// gulp.task('copyfont', function() {
//   return gulp.src('./src/fonts/**')
//     .pipe(cssmin())
//     .pipe(gulp.dest('./lib/fonts'));
// });

gulp.task('build', ['compile']);
