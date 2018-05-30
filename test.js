var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var gulpaes = require('./');

describe('gulp-aes', function () {
  describe('in buffer mode', function () {
    it('should prepend text', function (done) {
      var clearTextfile = new File({
        contents: new Buffer('abufferwiththiscontent')
      });
      var ec = gulpaes.enc();
      ec.write(clearTextfile);
      ec.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), 'oAbR9AEXEBIwoFTexPj+YULY/DO1/9BGOhGEZVXBE1Y=');
        done();
      });
    });

    it('should prepend text', function (done) {
      var cipherTextfile = new File({
        contents: new Buffer('oAbR9AEXEBIwoFTexPj+YULY/DO1/9BGOhGEZVXBE1Y=')
      });

      var dc = gulpaes.dec();
      dc.write(cipherTextfile);
      dc.once('data', function (file) {
        assert(file.isBuffer());
        assert.equal(file.contents.toString('utf8'), 'abufferwiththiscontent');
        done();
      });

    });
  });
});
