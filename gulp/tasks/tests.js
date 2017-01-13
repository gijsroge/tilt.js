/* SCSS task */

/**
 * plugins
 */
var gulp = require('gulp'),
    qunit = require('node-qunit-phantomjs');

/**
 * configfile
 */
var config = require('../config');

gulp.task('test', function() {
    qunit(config.tests.path);
});