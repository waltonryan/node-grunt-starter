module.exports = function(grunt) {

  // Time how long tasks take
	require('time-grunt')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // directories
    dirs: {
      src: 'public/sass',
      css: 'public/css',
      js: 'public/js',
    },
    // js syntax check
    jshint: {
      lib: {
        src: ['<%= dirs.src %>/js/*.js']
      },
      options: {
        curly:    true,
        eqeqeq:   true,
        eqnull:   true,
        browser:  true,
        jquery:   true,
        yui:      true
      }
    },
    // process scss files
    sass: {
			build: {
        src: '<%= dirs.src %>/main.scss',
        dest: '<%= dirs.css %>/main.css'
			}
		},
    // combines js files
    concat: {
      options: {
        separator: '\n'
      },
      build: {
        src: ['<%= dirs.src %>/js/*.js'],
        dest: '<%= dirs.js %>/main.js',
      }
    },
    // watch for local dev and debugging
    watch: {
			css: {
				files: '<%= dirs.src %>/css/*.scss',
				tasks: ['sass']
			},
      js: {
        files: '<%= dirs.src %>/js/*.js',
				tasks: ['jshint:lib', 'concat']
      }
		}
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');

  // Default task(s).
  grunt.registerTask('default', ['jshint', 'concat', 'sass']);

  grunt.registerTask('dev', ['watch']);

};
