module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      build: {
        files: [{
            expand: true,
            src: ['**/*.js', '**/*.js', '**/*.js'],
            dest: 'js-min',
            cwd: 'js'
        }]
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'css/',
        src: ['**/*.css'],
        dest: 'css-min'
      }
    },

    jshint: {
      files: ['gruntfile.js', 'js/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true
        },
        expr: true
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);

};
