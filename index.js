var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;

var aes = require('./lib/aes');
const PLUGIN_NAME = 'gulp-aes';

function gulpcrypto() {
  var stream = through.obj(function (file, enc, cb) {
    if (file.isStream()) {
      this.emit('error', new PluginError(PLUGIN_NAME, 'Streams are not supported!'));
      return cb();
    }

    if (file.isBuffer()) {
      file.contents = new Buffer(aes.enc(file.contents));
    }

    this.push(file);

    cb();
  });

  return stream;
};

module.exports = gulpcrypto;
