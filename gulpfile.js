'use strict';
var gulp = require('gulp'),
	wiredep = require('wiredep').stream,
	useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    webserver = require('gulp-webserver'),
    cleanCSS = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    image = require('gulp-image'),
    concatCss = require('gulp-concat-css'),
    cache = require('gulp-cache');

// clean
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean({force: true}));
});

//clear cache
gulp.task('clear', function (done) {
  return cache.clearAll(done);
});

//sass
gulp.task('sass', function () {
  return gulp.src('./src/app/sass/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', sass.logError)
    .pipe(gulp.dest('./dist/css/'));
});

//bower
gulp.task('bower', function () {
  gulp.src('./src/app/*.html')
    .pipe(wiredep({
      directory: "bower_components"
    }))
    .pipe(gulp.dest('./src/app'));
});

//html
gulp.task('html', function () {
    return gulp.src('./src/app/*.html')
        .pipe(useref())
        .pipe(gulpif('./*.js', uglify()))
        .pipe(gulp.dest('./dist'));
});

//img
gulp.task('image', function () {
  gulp.src('./src/app/img/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/img'));
});

//fonts
gulp.task('fonts', function() {
   gulp.src('./src/app/fonts/**/*.{ttf,woff,woff2,eot,svg}')
   .pipe(gulp.dest('./dist/fonts'));
});

//watch
gulp.task('watch', function() {
    gulp.watch('src/app/sass/**/*.scss', ['sass']);
    gulp.watch('./src/app/*.html', ['html']);
});

//server
gulp.task('webserver', function() {
		gulp.src('./dist')
			.pipe(webserver({
			livereload: true,
            host: '0.0.0.0'
		}));
	});
// network access - use cmd -> ipconfig -> IPv4 -> 192.168.20.234 Example: http://192.168.20.234:8000/dashboard.html (8000 local port)
gulp.task('build', [
	'bower',
    'sass',
    'fonts',
    'image',
    'watch',
    'html',
	'webserver'
]);

