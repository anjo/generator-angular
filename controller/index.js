
var path = require('path'),
  util = require('util'),
  ScriptBase = require('../script-base.js'),
  grunt = require('grunt'),
  angularUtils = require('../util.js');

module.exports = Generator;

function Generator() {

    // if the controller name is suffixed with ctrl, remove the suffix
    if (this.name && this.name.substr(-4).toLowerCase() === 'ctrl') {
        this.name = this.name.slice(0, -4);
    }
    ScriptBase.apply(this, arguments);
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.template('controller', this.controllerFile('app', this.name));
  this.template('spec/controller', this.controllerFile('test/spec', this.name) + "-spec");
};

Generator.prototype.rewriteIndexHtml = function() {
  var file = 'app/index.html';
  var body = grunt.file.read(file);
  
  body = angularUtils.rewrite({
    needle: '<!-- endbuild --><!-- scripts/scripts.js -->',
    haystack: body,
    splicable: [
      '<script src="' + this.controllerFile('', this.name) + '.js"></script>'
    ]
  });

  grunt.file.write(file, body);
};
