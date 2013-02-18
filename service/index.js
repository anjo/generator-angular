
var path = require('path'),
    util = require('util'),
    ScriptBase = require('../script-base.js'),
    grunt = require('grunt'),
    angularUtils = require('../util.js');

module.exports = Generator;

function Generator() {
    ScriptBase.apply(this, arguments);
    //this.sourceRoot(path.join(__dirname, '../templates'));

    var allowedTypes = [
        'constant',
        'factory',
        'provider',
        'service',
        'value'
    ];
    this.option('type');
    this.type = this.options.type || "service";

    this.appname = path.basename(process.cwd());
}

util.inherits(Generator, ScriptBase);

Generator.prototype.createServiceFiles = function createServiceFiles() {
    this.template(path.join('service', this.type), this.serviceFile('app', this.name));
    this.template('spec/service', this.serviceFile('test/spec', this.name) + "-spec");
};

Generator.prototype.rewriteIndexHtml = function() {
    var file = 'app/scripts/scripts.js';
    var body = grunt.file.read(file);

    body = angularUtils.rewrite({
        needle: '//END',
        haystack: body,
        splicable: [
            '"' + this.serviceFile('', this.name) + '.js' + '",'
        ]
    });

    grunt.file.write(file, body);
};
