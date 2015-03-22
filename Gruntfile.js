module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    lineNumbers: true,
                    includePaths: ['bower_components/foundation/scss']
                },
                files: {
                    'static/style.css': 'sass/style.scss'
                }
            }
        },

        concat: {
            dist: {
                src: ['bower_components/modernizr/modernizr.js', 'bower_components/yepnope/dist/yepnope-2.0.0.js'],
                dest: 'static/head.js'
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, src:'font/**', dest:'static/'},
                    {expand: true, src:'img/**', dest:'static/'},
                    {src:'js/body.js', dest:'static/body.js'},
                    {src:'js/google-analytics.js', dest:'static/google-analytics.js'}
                ]
            }
        },

        jade: {
            dist: {
                files: {
                    'index.html': 'index.jade'
                }
            }
        },

        watch: {
            sass: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            jade: {
                files: '**/*.jade',
                tasks: ['jade']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['sass', 'concat', 'copy', 'jade']);
};