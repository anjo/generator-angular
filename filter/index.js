
var path = require('path'),
  util = require('util'),
  ScriptBase = require('../script-base.js'),
  grunt = require('grunt'),
  angularUtils = require('../util.js');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));

  this.appname = path.basename(process.cwd());
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createFilterFiles = function createFilterFiles() {
  this.template("filter", this.filterFile('app', this.name));
  this.template('spec/filter', this.filterFile('test/spec', this.name) + "-spec");
};

Generator.prototype.rewriteIndexHtml = function() {
  var file = 'app/index.html';
  var body = grunt.file.read(file);
  
  body = angularUtils.rewrite({
    needle: '<!-- endbuild --><!-- scripts/scripts.js -->',
    haystack: body,
    splicable: [
      '<script src="' + this.filterFile('', this.name) + '.js"></script>'
    ]
  });

  grunt.file.write(file, body);
};