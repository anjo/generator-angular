
var path = require('path'),
    util = require('util'),
    yeoman = require('../../../../');

var Generator = module.exports = function Generator() {
    yeoman.generators.Base.apply(this, arguments);

    this.appname = path.basename(process.cwd());

    var args = ['main'];

    this.hookFor('angular:common', {
        args: args
    });

    this.hookFor('angular:app', {
        args: args
    });

    this.hookFor('angular:route', {
        args: args
    });
};

util.inherits(Generator, yeoman.generators.NamedBase);

// Duplicated from the SASS generator, waiting a solution for #138
Generator.prototype.bootstrapFiles = function bootstrapFiles() {
    this.copy( '../../templates/component.json', 'component.json' );
    this.copy( '../../templates/testacular.conf.js', 'testacular.conf.js' );
};

// rewrite index.html
