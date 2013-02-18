
var path = require('path'),
  util = require('util'),
  ScriptBase = require('../script-base.js'),
  grunt = require('grunt'),
  angularUtils = require('../util.js');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
    this.viewfilename = this.viewFile("", this.basename) + ".html";
    this.hookFor('angular:view', {
        args: [this.name]
    });
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createDirectiveFiles = function createDirectiveFiles() {
  this.template('directive', this.directiveFile('app', this.name));
  this.template('spec/directive', this.directiveFile('test/spec', this.name) + "-spec");
};

Generator.prototype.rewriteIndexHtml = function() {
    var file = 'app/scripts/scripts.js';
    var body = grunt.file.read(file);

    body = angularUtils.rewrite({
        needle: '//END',
        haystack: body,
        splicable: [
            '"' + this.directiveFile('', this.name) + '.js' + '",'
        ]
    });

    grunt.file.write(file, body);
};
