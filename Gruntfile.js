'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: ['src/**/*.js'],
      karma: ['test/**/*.spec.js']
    },
    jshint: {
      src: [
        'Gruntfile.js',
        '<%= src.js %>',
        '<%= src.karma %>'
      ],
      karma: [
        '<%= src.karma %>'
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      }
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },
    delta: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= src.js %>',
        task: ['jshint:src']
      },
      karma: {
        files: '<%= src.karma %>',
        tasks: ['jshint:karma', 'karma:unit']
      }
    }
  });

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['default', 'delta']);

  grunt.registerTask('default', ['jshint', 'karma']);
};
