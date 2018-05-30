# gulp-aes

gulp-aes, crypto files with AES.

    var gulp_aes = require('gulp-aes');
    gulp_aes.enc()
    gulp_aes.dec()
    // key must be 32 byte String
    gulp_aes.enc(key)
    gulp_aes.dec(key)

## Usage

gulpfile：

    var gulp = require('gulp');
    var gulp_aes = require('gulp-aes');
    var gulp_rename = require('gulp-rename');

    gulp.task('javascripts', function () {
    gulp.src(['**/*.js', '!target/**', '!node_modules/**', '!gulpfile.js'])
    .pipe(gulp_aes.enc())
    .pipe(gulp_rename({extname: ".jsa"}))
    .pipe(gulp.dest('target'));
    });

    gulp.task('default', ['javascripts']);
