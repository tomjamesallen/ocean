var gulp = require('gulp');
var distRoot = require('./gulp-config.json').distRoot;
var requireDir = require('require-dir');
var runSequence = require('run-sequence');
var env = require('gulp-env');
var del = require('del');

requireDir('./tasks');

// Gulp needs to perform the following tasks:
// * Compile front end assets - JS / CSS / HTML (requires watch)
// 
// Directory structure is as follows:
// - src/
//    - scss/
//    - js/
//    - index.html
// - dist/
//    - css/
//    - js/
//    - index.html

// Setup env.
gulp.task('set-env:development', function () {
  env({
    vars: {
      NODE_ENV: 'development'
    }
  });
});
gulp.task('set-env:staging', function () {
  env({
    vars: {
      NODE_ENV: 'staging'
    }
  });
});
gulp.task('set-env:production', function () {
  env({
    vars: {
      NODE_ENV: 'production'
    }
  });
});

gulp.task('clean', function () {
  return del([distRoot]);
});

// Server task (takes care of express and live reload).
gulp.task('server', require('./server.js')(gulp));


// Default task.
gulp.task('default', function(callback) {
  runSequence(
    'clean',
    'set-env:development',
    ['compile:watch:jshint', 'watch:js', 'watch:scss'],
    'compile:jekyll',
    'server',
    'watch:jekyll',
    callback
  );
});

// Alias for production build.
gulp.task('build', function(callback) {
  runSequence(
    'clean',
    'set-env:production',
    ['compile:js', 'compile:scss'],
    'compile:jekyll',
    callback
  );
});




