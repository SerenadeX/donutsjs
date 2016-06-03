var concat = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['src/**.js', 'app.js'],
        dest: 'build/bruce.js',
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('bruce', ['concat']);
};


module.exports = concat;
