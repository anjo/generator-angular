
var path = require('path'),
    util = require('util'),
    NameBase = require('../name-base'),
    yeoman = require('../../../../');

module.exports = Generator;

function Generator() {
    NameBase.apply(this, arguments);
    this.sourceRoot(path.join(__dirname, '../templates'));
}

util.inherits(Generator, NameBase);

Generator.prototype.createViewFiles = function createViewFiles() {
    this.template('common/view.html', this.viewFile('app', this.basename) + '.html');
};
