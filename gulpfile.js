/* Gulpfile */

/**
 * Task to split tasks into seperate files
 */
var requireDir = require('require-dir');

/**
 * Require tasks from gulp/tasks folder
 */
requireDir('./gulp/tasks', { recurse: true });