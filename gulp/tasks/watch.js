/* Watch task */

/**
 * plugins
 */
var gulp = require('gulp'),
    watch = require('gulp-watch');

/**
 * configs
 */
var config = require('../config');

/**
 * Tasks
 */
gulp.task('watch', ['default', 'browsersync', 'scss'], function () {
    gulp.watch(config.files, ['browsersyncReload']);
    gulp.watch(config.scss.glob, ['scss']);
    gulp.watch(config.js.glob, ['browsersyncReload', 'transpile']);
});
