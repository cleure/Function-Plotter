
/*
var gulp = require('gulp'),
    browserify = require('gulp-browserify');
*/

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat');

gulp.task('browserify', function() {
    gulp.src('src/main.js')
        .pipe(browserify({
            'insertGlobals': true,
            'debug': true
        }))
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./'));
});

gulp.task('lint', function() {
    gulp.src('./src/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.js'], [
        'lint',
        'browserify'
    ]);
});

gulp.task('default', ['lint', 'browserify', 'watch']);
