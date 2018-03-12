module.exports = function (grunt) {

	grunt.initConfig({
		karma: {
			unit: {
				options: {
					hostname: '127.0.0.1',
					listenAddress: '127.0.0.1',
					frameworks: ['jasmine', 'commonjs'],
					preprocessors: {
						'src/*.js': ['commonjs'],
						'test/unit/specs/*': ['commonjs']
					},
					files: [
						'src/*.js',
						'test/unit/specs/*.js'
					],
					singleRun: true,
				},
				browsers: {
					options: {
						browsers: ['Firefox', 'Chrome'],
						reporters: ['progress']
					}
				}
			}
		}
	})

	grunt.loadNpmTasks('grunt-karma')
	grunt.registerTask('default', ['karma'])

}