var fs = require('fs');
var path = require('path');

function config() {
  var filename = path.normalize(__dirname + '/../config.json');
  //var filename = path.resolve(global.webroot + '', '../config.json');
  return JSON.parse(fs.readFileSync(filename));
};

module.exports = config();
