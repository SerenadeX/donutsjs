## Donuts.js

### Grunt - Gulp - Hoth

Taskrunners are tools that do stuff

It is primarily used as a build tools

Grunt and gulp are like conductors

### Plugins!

Plugins do all the stuff; grunt and gulp just tell the plugins what to do.


##### Number of plugins
- Gulp 1409
- Grunt 4403

##### Tasks

Example one - Grunt

```js
module.exports = function(grunt) {
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
}
```
Example two - Gulp

```js
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('bruce', function() {
  gulp.src([
    './src/**.js',
    './app.js'
  ])
  .pipe(concat('bruce.js'))
  .pipe(gulp.dest('./build'));
});
```


With gulp, you just hand data from one task to the next through pipe


You call them the same way

```bash
gulp bruce
grunt bruce
```

Environment Specific tasks

```bash
gulp stage
```


Grunt
- config
- everything is a plugin

Gulp
- code
- everything is code
- still plugins


Gulp runs tasks concurrently for serial behavior.

```js
gulp.task('one', function(cb) {
  cb(err);
});

gulp.task('two', ['one'], function() {

});

gulp.task('default', ['two']);

gulp.task('stuff', ['one', 'two']);
```

In the last line, `stuff` tells gulp to run `one` and `two` concurrently.

Less intermediate files (another benefit to streams)




## MWS 2.4.0

http://slides.com/corybrown/deck-7/live#/

MWS is Mobile Web Stack

Version 2.4.0 is Hoth

Gulp is coming to MWS in Hoth

- Same task support
- Simpler API
- Easier to comprehend
- Enhanced Functionality
- Easier to customize
- Faster builds
-

What's new?

- `npm run build`
- Update in place
  - Additive, not destructive
- Additional options
  - offline
  - WAM interceptor
- Better code linting
- Stack4 integration improvements


What's missing?

- Feedback
- Slack @ #fe-stack
- Feddlers
- [Email](mailto:stack@ldschurch.org)
- Yammers
- Stop by


## Sell me on gulp
