  
var util = require('util'),
    path = require('path'),
    NameBase = require('./name-base'),
    grunt = require('grunt'),
    yeoman = require('../../../');

module.exports = Generator;

function Generator() {
    NameBase.apply(this, arguments);
  // attempt to detect if user is using CS or not
  // if cml arg provided, use that; else look for the existence of cs
  if (!this.options.coffee &&
    grunt.file.expandFiles(path.join(__dirname,
      '/app/scripts/**/*.coffee')).length > 0)
  {
    this.options.coffee = true;
  }


  var sourceRoot = '/templates/javascript';
  this.scriptSuffix = '.js';

  if (this.options.coffee)
  {
    sourceRoot = '/templates/coffeescript';
    this.scriptSuffix = '.coffee';
  }

  this.sourceRoot(path.join(__dirname, sourceRoot));
}

util.inherits(Generator, NameBase);

Generator.prototype.template = function (src, dest) {
  yeoman.generators.Base.prototype.template.apply(this, [
    src + this.scriptSuffix,
    dest + this.scriptSuffix
  ]);
};

Generator.prototype.htmlTemplate = function () {
  yeoman.generators.Base.prototype.template.apply(this, arguments);
};
