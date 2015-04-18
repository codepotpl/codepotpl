module.exports = function (grunt) {
    grunt.initConfig({
        sass: {
            dist: {
                options: {
                    includePaths: ['bower_components/foundation/scss']
                },
                files: {
                    'public/style.css': 'src/sass/style.scss'
                }
            }
        },

        concat: {
            dist: {
                src: ['bower_components/modernizr/modernizr.js', 'bower_components/yepnope/dist/yepnope-2.0.0.js'],
                dest: 'public/head.js'
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, cwd:'src/font/', src:['**'], dest:'public/font/'},
                    {expand: true, cwd:'src/img/', src:['**'], dest:'public/img/'},
                    {expand: true, cwd:'src/static/', src:['**'], dest:'public/'},
                    {expand: true, cwd:'src/sass/team_css', src:['**'], dest:'public/team_css'},
                    {expand: true, cwd:'src/js/team_js', src:['**'], dest:'public/team_js'},
                    {expand: true, cwd:'src/img/team_img', src:['**'], dest:'public/team_img'},
                    {expand: true, cwd:'src/bootstrap/', src:['**'], dest:'public/bootstrap'},
                    {expand: true, cwd:'src/bootstrap/', src:['**'], dest:'public/bootstrap'},
                    {expand: true, cwd:'src/img/speakers_img/', src:['**'], dest:'public/speakers_img'},
                    {expand: true, cwd:'src/sass/speakers_css/', src:['**'], dest:'public/speakers_css'},
                    {src:'src/js/body.js', dest:'public/body.js'},
                    {src:'src/js/google-analytics.js', dest:'public/google-analytics.js'}
                ]
            }
        },

        cssmin: {
            dist: {
                files: {
                    'public/style.css': ['public/style.css']
                }
            }
        },

        uglify: {
            dist: {
                files: {
                    'public/head.js': ['public/head.js'],
                    'public/body.js': ['public/body.js'],
                    'public/google-analytics.js': ['public/google-analytics.js']
                }
            }
        },

        watch: {
            sass: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['sass', 'concat', 'copy']);
    grunt.registerTask('dist', ['sass:dist', 'concat:dist', 'copy:dist', 'cssmin:dist', 'uglify:dist']);
};