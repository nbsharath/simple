require('es6-promise').polyfill();
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    //sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'),
    concat = require('gulp-concat');

//task used to convert scss into minified css
gulp.task('styles', function() {
    return sass('src/css/*.scss')
        .on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(gulp.dest('desc/css'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(minifycss())
        .pipe(gulp.dest('desc/css/min'))
        .pipe(browserSync.stream());

});
//task for copying the html
gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('desc'));
});

//task used to concate the javascript and uglify it
gulp.task('build-js', function() {
    return gulp.src('src/javascript/*.js')
        .pipe(concat('script.js'))
        //.pipe(stripDebug())
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('desc/javascript'));
});

gulp.task('watch', function() {
    browserSync.init({
        server: "desc"
    })
    gulp.watch('src/**/*.*', ['styles', 'html', 'build-js']);
    gulp.watch('desc/*.*').on('change', browserSync.reload);
})
