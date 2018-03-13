module.exports = function (grunt) {

	grunt.initConfig({
        jshint: {
            options: {
                reporter: require('jshint-stylish'),
                jshintrc: true
            },
            build: {
                src: ['gruntfile.js', 'tasks/*.js']
            },
            src: {
                src: 'src/**/*.js'
            },
            test: {
                src: 'test/*/specs/*.js'
            }
        },
		karma: {
			options: {
                hostname: '127.0.0.1',
                listenAddress: '127.0.0.1',
                frameworks: ['jasmine', 'commonjs'],
                preprocessors: {
                    'src/**/*.js': ['commonjs'],
                    'test/unit/**/*.js': ['commonjs']
                },
                files: [
                    'src/**/*.js',       
                    'test/unit/**/*.js'
                ],
                singleRun: true,
            },
            browsers: {
                options: {
                    browsers: ['Firefox', 'Chrome'],
                    reporters: ['progress']
                }
            }
        },
        watch: {
            browserify: {
                files: ['src/**/*.js'],
                tasks: ['browserify']
            }
        },
        browserify: {
            dev: {                
                src: ['src/vue.js'],
                dest: 'dist/bundle.js',                
            }
        },
        // 实时刷新服务器
        browserSync: {
            bsFiles: {
                src: ['dist/bundle.js', 'dist/*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        }
    })
    
    grunt.loadNpmTasks('grunt-contrib-jshint')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-browser-sync')

    // load custom tasks
    grunt.file.recurse('tasks', function (path) {
        require('./' + path)(grunt)
    })

	grunt.registerTask('test', ['karma'])
    grunt.registerTask('build', ['browserSync', 'watch'])    
}