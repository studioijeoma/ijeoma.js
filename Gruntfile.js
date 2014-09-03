module.exports = function(grunt) {
    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/easing/Easing.js', 'src/Motion.js', 'src/MotionController.js', 'src/tween/*.js'],
                dest: 'build/ijeomamotion.js',
            },
        },
        uglify: {
            build: {
                src: 'build/ijeomamotion.js',
                dest: 'build/ijeomamotion.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['*.js', 'src/*.js', 'src/easing/*.js', 'src/tween/*.js', 'examples/*.html'],
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
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'watch']);
};