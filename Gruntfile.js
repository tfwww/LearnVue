module.exports = function( grunt ) {

    grunt.initConfig({

        version: grunt.file.readJSON('package.json').version,

        watch: {
            browserify: {
                files: ['src/**/*.js', 'test/tests.js'],
                tasks: ['browserify']
            }
        },
        browserify: {
            dev: {                
                src: ['test/tests.js'],
                dest: 'test/bundle.js',
            }
        },
        // 实时刷新服务器
        browserSync: {
            bsFiles: {
                src: ['test/bundle.js', 'test/*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./"
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-browserify')
    grunt.loadNpmTasks('grunt-browser-sync')

    grunt.registerTask( 'build', ['browserSync', 'watch'])
}