'use strict';
var path = require('path');
var util = require('util');
var grunt = require('grunt');
var ScriptBase = require('../script-base.js');
var angularUtils = require('../util.js');


module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
  this.appname = this.modulename;
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createModuleFiles = function createModuleFiles() {
  this.template('module', 'app/scripts/' + this.basename + '/module');
};

Generator.prototype.rewriteIndexHtml = function() {
    var file = 'app/scripts/scripts.js';
    var body = grunt.file.read(file);

    body = angularUtils.rewrite({
        needle: '//END',
        haystack: body,
        splicable: [
            '"' + this.basename + '/module.js' + '",'
        ]
    });

    grunt.file.write(file, body);
};
