/* SCSS task */

/**
 * plugins
 */
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var plumber = require('gulp-plumber');
var babel = require("gulp-babel");

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
