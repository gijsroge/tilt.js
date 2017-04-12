/* default task */

/**
 * Plugins
 */
var gulp = require('gulp');

/**
 * Tasks
 */
gulp.task('build', [
  'scss', 'transpile', 'compress', 'test'
]);
