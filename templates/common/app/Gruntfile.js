module.exports = function( grunt ) {
    'use strict';
    //
    // Grunt configuration:
    //
    // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
    //
    grunt.registerTask('coffee', 'insert dependency flags and templates', function () {
    });
    grunt.registerTask('compass', 'insert dependency flags and templates', function () {
    });

    // angular specific stuff
    grunt.registerTask('ngmin', 'insert dependency flags and templates', function () {
        var jsFiles = grunt.config("ngmin").js || [];
        var viewFiles = grunt.config("ngmin").views || [];
        var done = this.async();
        var childProcess = require('child_process');
        jsFiles.forEach(function(pattern) {
            var files = grunt.file.expandFiles(pattern)
            files.forEach(function(file) {
                var content = grunt.file.read(file);
                childProcess.exec('ngmin "' + file + '" -o "' + file + '"', function (err, stdout) {
                    grunt.log.write("processed: " + file +"\n");
                    done(err);
                });
            });
        });
    });

    grunt.registerMultiTask('html2js', 'Generate js version of html template.', function() {
        var TPL = '';
        var single = true; // do you want one file per template or all in one?

        if(!single) {;
            TPL += 'angular.module("templates").run(function($templateCache) {\n';
            TPL += '  $templateCache.put("<%= file %>",\n    "<%= content %>");\n';
            TPL += '});\n';
        } else {
            TPL += '  $templateCache.put("<%= file %>",\n    "<%= content %>");\n';
        }

        var escapeContent = function(content) {
            return content.replace(/"/g, '\\"').replace(/\n/g, '" +\n    "');
        };

        var files = grunt._watch_changed_files || grunt.file.expand(this.data);
        var items = [];
        files.forEach(function(file) {
            var content = grunt.template.process(TPL, {
                file: file.replace(/^app\//, ""),
                content: escapeContent(grunt.file.read(file))
            });
            items.push(content);
            if(!single) {
                grunt.file.write(file + '.js', content);
            }

        });
        if(single) {
            console.log(this, items.length)
            var content = 'angular.module("templates", []).run(function($templateCache) {\n' +
                items.join("\n") +
                '});\n';
            grunt.file.write(this.file.dest, content);
        }
    });

    // Custom build order
    grunt.registerTask('build',   'intro clean mkdirs html html2js                concat css                    copy      time');
    grunt.registerTask('dist',    'intro clean mkdirs html html2js usemin-handler concat css min img rev usemin copy test time');
    grunt.registerTask('release', 'intro clean mkdirs html html2js usemin-handler concat css min img rev usemin copy test time');

    // Alias the `test` task to run `testacular` instead
    grunt.registerTask('test', 'run the testacular test driver', function () {
        var done = this.async();
        require('child_process').exec('testacular start --single-run', function (err, stdout) {
            grunt.log.write(stdout);
            done(err);
        });
    });

    // Alias the `test` task to run `testacular` instead
    grunt.registerTask('fix_modules', 'run the testacular test driver', function () {
        var done = this.async();
        try {
            require('fs').unlink("scripts/modules");
            require('fs').mkdir("scripts/modules");
            require('child_process').exec('rsync -a ../app/scripts/modules/ scripts/modules/', function (err, stdout) {
                grunt.log.write(stdout);
                done(err);
            });
        } catch(e) {
            done(0);
        }
    });

    grunt.initConfig({

        // Project configuration
        // ---------------------
        // specify an alternate install location for Bower
        bower: {
            dir: 'app/components'
        },

        html2js: {
            "scripts/scripts.templates.js": ['<config:src.tpl>']
        },

        concat: {
            "scripts/scripts.js":["scripts/*.js", "scripts/**/module.js", "scripts/**/*.js", "!scripts/scripts.js", "!scripts/vendor/*.js"],
        },

        ngmin:{
            js:["scripts/scripts.js"]
        },
        src: {
            js: ['scripts/**/*.js', 'temp/**/*.js'],
            html: ['index.html'],
            tpl: ['scripts/**/*.html']
        },

        // default watch configuration
        watch: {
            reload: {
                files: [
                    'app/*.html',
                    'app/styles/**/*.css',
                    'app/scripts/**/*.js',
                    'app/scripts/views/**/*.html',
                    'app/images/**/*'
                ],
                tasks: 'build'
            }
        },

        // default lint configuration, change this to match your setup:
        // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#lint-built-in-task
        lint: {
            files: [
                'Gruntfile.js',
                'app/scripts/**/*.js',
                'spec/**/*.js'
            ]
        },

        // specifying JSHint options and globals
        // https://github.com/cowboy/grunt/blob/master/docs/task_lint.md#specifying-jshint-options-and-globals
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true
            },
            globals: {
                angular: true
            }
        },

        // Build configuration
        // -------------------

        // the staging directory used during the process
        staging: 'temp',
        // final build output
        output: 'dist',

        mkdirs: {
            staging: 'app/'
        },

        // Below, all paths are relative to the staging directory, which is a copy
        // of the app/ directory. Any .gitignore, .ignore and .buildignore file
        // that might appear in the app/ tree are used to ignore these values
        // during the copy process.

        // concat css/**/*.css files, inline @import, output a single minified css
        css: {
            'styles/main.css': ['styles/**/*.css']
        },

        // renames JS/CSS to prepend a hash of their contents for easier
        // versioning
        rev: {
            js: ['scripts/*.js','scripts/vendor/**.js'],
            css: 'styles/**/*.css',
            img: 'images/**'
        },

        // usemin handler should point to the file containing
        // the usemin blocks to be parsed
        'usemin-handler': {
            html: 'index.html'
        },

        // update references in HTML/CSS to revved files
        usemin: {
            html: ['*.html'],
            css: ['styles/*.css']
        },

        // HTML minification
        html: {
            files: ['**/*.html']
        },

        // Optimizes JPGs and PNGs (with jpegtran & optipng)
        img: {
            dist: '<config:rev.img>'
        },

        // rjs configuration. You don't necessarily need to specify the typical
        // `path` configuration, the rjs task will parse these values from your
        // main module, using http://requirejs.org/docs/optimization.html#mainConfigFile
        //
        // name / out / mainConfig file should be used. You can let it blank if
        // you're using usemin-handler to parse rjs config from markup (default
        // setup)
        rjs: {
            // no minification, is done by the min task
            optimize: 'none',
            baseUrl: './scripts',
            wrap: true
        }
    });
};
