var EXPRESS_PORT = 8899;
var EXPRESS_ROOT = __dirname + '/_site';
var LIVERELOAD_PORT = 35729;

var gulp = require('gulp');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fallback = require('express-history-api-fallback')

var config = require('./gulp-config')

var lr;
function startLivereload() {
  lr = require('tiny-lr')();
  lr.listen(LIVERELOAD_PORT);
}

function notifyLivereload(event) {
  var fileName = require('path').relative(EXPRESS_ROOT, event.path);
  lr.changed({
    body: {
      files: [fileName]
    }
  });
}

function startExpress() {
  app.use(require('connect-livereload')());

  // We should first try to serve files from the `/dist` directory, as this will
  // be the most up to date version of `scss` and `js` files.
  app.use('/dist', express.static(__dirname + '/dist'));

  // We then fall back to the compiled `_site` directory.
  app.use(express.static(EXPRESS_ROOT));
  
  http.listen(EXPRESS_PORT, function() {
    console.log(`listening on *:${EXPRESS_PORT}`);
  });
}

module.exports = function(gulp) {
  return function () {
    startExpress();
    startLivereload();
    gulp.watch([
      `${config.serverRoot}/**`,
      `!${config.serverRoot}/dist/**`,
      `${config.distRoot}/**`
    ], notifyLivereload);
  }
}
