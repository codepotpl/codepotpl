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
                files: {
                    'public/head.js': [
                        'bower_components/modernizr/modernizr.js',
                        'bower_components/yepnope/dist/yepnope-2.0.0.js'
                    ],
                    'public/body.js': [
                        'bower_components/jquery/dist/jquery.js',
                        'bower_components/foundation/js/foundation/foundation.js',
                        'bower_components/foundation/js/foundation/foundation.topbar.js',
                        'src/js/body.js'
                    ]
                }
            }
        },

        copy: {
            dist: {
                files: [
                    {expand: true, cwd: 'src/font/', src: ['**'], dest: 'public/font/'},
                    {expand: true, cwd: 'src/img/', src: ['**'], dest: 'public/img/'},
                    {expand: true, cwd: 'src/static/', src: ['**'], dest: 'public/'},
                    {src: 'src/js/call-for-papers.js', dest: 'public/call-for-papers.js'},
                    {src: 'src/js/google-analytics.js', dest: 'public/google-analytics.js'}
                ]
            }
        },

        'imagemagick-resize': {
            people: {
                from: 'src/img/people/',
                to: 'public/img/people/',
                files: '*.jpg',
                props: {
                    width: 300,
                    quality: 0.6
                }
            },
            sponsors: {
                from: 'src/img/logo/',
                to: 'public/img/logo/',
                files: '*.png',
                props: {
                    width: 300
                }
            }
        },

        pngmin: {
            compile: {
                options: {
                    concurrency: 8,
                    ext: '.png',
                    quality: {min: 10, max: 80},
                    speed: 1,
                    force: true
                },
                files: [
                    {
                        src: 'public/img/organizations/*.png',
                        dest: 'public/img/organizations/'
                    }
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
            },
            concat: {
                files: 'src/js/**.*',
                tasks: ['concat']
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-imagemagick');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-pngmin');

    grunt.registerTask('default', ['sass', 'concat', 'copy']);
    grunt.registerTask('dist', [
        'sass:dist',
        'concat:dist',
        'copy:dist',
        'cssmin:dist',
        'uglify:dist',
        'imagemagick-resize',
        'pngmin'
    ]);
};