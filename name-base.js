
var util = require('util'),
    path = require('path'),
    grunt = require('grunt'),
    _ = grunt.util._,
    yeoman = require('../../../');

module.exports = Generator;

function Generator() {
    yeoman.generators.NamedBase.apply(this, arguments);
    function clean(str) {
        // return ("" + str).split(/\W+/).replace(/\\W+/g,'');
        return ("" + str).split(/\W+/).join("");
    }
    function strip(str) {
        return str.split("/").join("-");
    }
    this.appname = path.basename(process.cwd());
    var m = this.name.split("/");
    this.module = m.length > 1 ? m.splice(0, m.length - 1).join("/") : "";
    this.modulename = clean(_.camelize(this.module)) || _.camelize(this.appname) + "App";
    this.basename = this.name.split("/").pop() || "";
    this.classname = clean(_.classify(strip(this.basename)));
    this.camelname = clean(_.camelize(strip(this.basename)));
    this.directivename = strip(_.dasherize(this.basename));
    grunt.log.writeln("module: " + this.modulename + "," + this.classname+ "," + this.camelname)
    this._ = _;
}

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.moduleFolder = function (prefix) {
    var result = "";
    if(prefix == "test/spec") {
        result = prefix + "/"
    } else if(prefix == "") {
        result = "scripts/";
    } else {
        result = prefix + "/scripts/";
    }
    if(this.module != "") {
        result = result + "" + this.module + "/";
    } else {
        if(prefix != "") {
            result = result + "/";
        }
    }
    return result;
}

function fixText(name) {
    if(name.match(/^test\/spec\/.*?\/views/)) {
        return name.replace(/\/[^\/]+?$/, "");
    }
    return name;
}

Generator.prototype.viewFile = function (prefix, name) {
    return fixText(this.moduleFolder(prefix) + "views/" + this.basename + "/" + this.basename);
}
Generator.prototype.controllerFile = function (prefix, name) {
    return fixText(this.moduleFolder(prefix) + "views/" + this.basename + "/" + this.basename);
}
Generator.prototype.serviceFile = function (prefix, name) {
    return this.moduleFolder(prefix) + "" + this.basename;
}
Generator.prototype.directiveFile = function (prefix, name) {
    return fixText(this.moduleFolder(prefix) + "views/" + this.basename + "/" + this.basename);
}
Generator.prototype.filterFile = function (prefix, name) {
    return this.moduleFolder(prefix) + "" + this.basename;
}
Generator.prototype.htmlTemplate = function () {
    yeoman.generators.Base.prototype.template.apply(this, arguments);
};
