'use strict';

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-conventional-changelog');

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    src: {
      js: ['src/**/*.js'],
      karma: ['test/**/*.spec.js']
    },
    jshint: {
      all: [
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
    concat: {
      src: {
        src: '<%= src.js %>',
        dest: 'dist/angular-registry.js'
      }
    },
    changelog: {
      options: {
        dest: 'CHANGELOG.md'
      }
    },
    delta: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      src: {
        files: '<%= src.js %>',
        task: ['jshint:all']
      },
      karma: {
        files: '<%= src.karma %>',
        tasks: ['jshint:karma']
      }
    },
    ngmin: {
      src: {
        src: '<%= concat.src.dest %>',
        dest: '<%= concat.src.dest %>'
      }
    },
    uglify: {
      src: {
        files: {
          'dist/angular-registry.min.js': 'dist/angular-registry.js'
        }
      }
    }
  });

  grunt.renameTask('watch', 'delta');
  grunt.registerTask('watch', ['delta']);
  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('build', ['default', 'concat:src', 'ngmin:src', 'uglify']);
};
