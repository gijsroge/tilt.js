/* JS task */

/**
 * plugins
 */
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require('gulp-plumber');
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

/**
 * Config file
 */
var config = require('../config');

/**
 * Transpile
 */
gulp.task("transpile", function () {
    return gulp.src(config.js.glob)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(babel())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest(config.js.dest));
});

gulp.task('compress', function (cb) {
    return gulp.src(config.js.dest + 'tilt.jquery.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(config.js.dest))
});