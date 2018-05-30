var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var gulpcrypto = require('./');

describe('gulp-aes', function () {
  describe('in buffer mode', function () {
    it('should prepend text', function (done) {
      var fakeFile = new File({
        contents: new Buffer('abufferwiththiscontent')
      });
      var gc = gulpcrypto();
      gc.write(fakeFile);
      gc.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), 'oAbR9AEXEBIwoFTexPj+YULY/DO1/9BGOhGEZVXBE1Y=');
        done();
      });
    });
  });
});
