var util = require('util');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

function load(webroot, lng) {
  //base en
  var jsonFile1 = path.join(webroot, util.format('/locales/%s/translation.json', 'en'));
  var jsonContent1 = fs.readFileSync(jsonFile1, 'utf-8');
  var obj1 = JSON.parse(jsonContent1);
  if (lng === 'en')
    return obj1;

  //other
  var jsonFile2 = path.join(webroot, util.format('/locales/%s/translation.json', lng));
  var jsonContent2 = fs.readFileSync(jsonFile2, 'utf-8');
  var obj2 = JSON.parse(jsonContent2);
  return _.merge(obj1, obj2);
}

module.exports = {
  load: load,
  version: '1.0.0'
};
