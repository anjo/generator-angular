var path = require('path'),
  util = require('util'),
  grunt = require('grunt'),
  yeoman = require('../../../../'),
  ScriptBase = require('../script-base.js');
  angularUtils = require('../util.js');

module.exports = Generator;

function Generator() {
  ScriptBase.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../templates'));

  this.appname = path.basename(process.cwd());

  this.hookFor('angular:controller', {
    args: [this.name]
  });
  this.hookFor('angular:view', {
    args: [this.name]
  });
}

util.inherits(Generator, ScriptBase);

Generator.prototype.rewriteAppJs = function() {
  var file = 'app/scripts/app.js'; // TODO: coffee
  var body = grunt.file.read(file);
  
  body = angularUtils.rewrite({
    needle: '.otherwise',
    haystack: body,
    splicable: [
      ".when('/" + this.name + "', {",
      "  templateUrl: '" + this.viewFile("", this.basename) + ".html',",
      "  controller: '" + this.classname + "Ctrl'",
      "})"
    ]
  });

  grunt.file.write(file, body);
};
