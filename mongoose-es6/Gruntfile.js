module.exports = function(grunt) {
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'out/*.js',
				dest: 'build/<%= pkg.name %>.min.js'
			}
		},
		babel: {
			options: {
				sourceMap: false
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'src',
					src: ['**/*.js'],
					dest: 'out',
					ext:'.js'
				}]
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-babel');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	
	grunt.registerTask('default', ['babel', 'uglify']);
	
}