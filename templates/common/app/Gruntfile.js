module.exports = function( grunt ) {
    'use strict';
    //
    // Grunt configuration:
    //
    // https://github.com/cowboy/grunt/blob/master/docs/getting_started.md
    //

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
        var views = [];
        viewFiles.forEach(function(pattern) {
            var files = grunt.file.expandFiles(pattern)
            files.forEach(function(file) {
                var content = grunt.file.read(file);
                views.push(["<script id='",file,"' type='text/ng-template'>", content,"</script>"].join(""));
                grunt.log.write("processed: " + file +"\n");
            });
        });
        var index = grunt.file.read("index.html");
        index = index.replace(/<\/body>/,  views.join("") +"</body>");
        grunt.file.write("index.html", index);
    });

    // Custom build order
    grunt.registerTask('build', 'intro clean mkdirs fix_modules usemin-handler concat ngmin css min img rev usemin copy time');

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
        require('fs').unlink("scripts/modules");
        require('fs').mkdir("scripts/modules");
        require('child_process').exec('rsync -a ../app/scripts/modules/ scripts/modules/', function (err, stdout) {
            grunt.log.write(stdout);
            done(err);
        });
    });

    grunt.initConfig({

        // Project configuration
        // ---------------------
        // specify an alternate install location for Bower
        bower: {
            dir: 'app/components'
        },

        ngmin:{
            js:["scripts/scripts.js"],
            views:["views/**/*.html", "scripts/**/*.html", "modules/**/*.html"]
        },

        // default watch configuration
        watch: {
            coffee: {
                files: 'app/scripts/**/*.coffee',
                tasks: 'coffee reload'
            },
            compass: {
                files: [
                    'app/styles/**/*.{scss,sass}'
                ],
                tasks: 'compass reload'
            },
            reload: {
                files: [
                    'app/*.html',
                    'app/styles/**/*.css',
                    'app/scripts/**/*.js',
                    'app/views/**/*.html',
                    'app/images/**/*'
                ],
                tasks: 'reload'
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
