module.exports = function(grunt) { 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/Motion.js', 'src/*.js'],
                dest: 'build/ijeoma.js',
            },
        },
        uglify: {
            build: {
                src: 'build/ijeoma.js',
                dest: 'build/ijeoma.min.js'
            }
        },
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                // pushTo: 'upstream',
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false
            }
        },
        watch: {
            scripts: {
                files: ['*.js', 'src/*.js', 'examples/*.html'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // grunt.registerTask('default', ['concat', 'uglify', 'bump', 'watch']);
    grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};