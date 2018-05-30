var gulp = require('gulp');
var gulp_aes = require('gulp-aes');
var gulp_rename = require('gulp-rename');

gulp.task('to_jsa', function () {
  gulp.src(['js/**/*.js'])
    .pipe(gulp_aes.enc())
	.pipe(gulp_rename({extname: ".jsa"}))
    .pipe(gulp.dest('target'));
});

gulp.task('to_js', function () {
  gulp.src(['jsa/**/*.jsa'])
    .pipe(gulp_aes.dec())
	.pipe(gulp_rename({extname: ".js"}))
    .pipe(gulp.dest('target'));
});

gulp.task('default', ['to_jsa','to_js']);
