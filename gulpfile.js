var gulp = require('gulp')
    , sass = require('gulp-sass')
    , sourcemaps = require('gulp-sourcemaps')
    , autoprefixer = require('gulp-autoprefixer')
    , imagemin = require('gulp-imagemin')
    , jshint = require('gulp-jshint')
    , stylish = require('jshint-stylish')
    , ngtemplate = require('gulp-angular-templatecache')
    , ngannotate = require('gulp-ng-annotate')
    , uglify = require('gulp-uglify')
    , stripdebug = require('gulp-strip-debug')
    , concat = require('gulp-concat')
    , CacheBuster = require('gulp-cachebust')
    , cachebust = new CacheBuster()
    , useref = require('gulp-useref')
    , browserSync = require('browser-sync')
    , karma = require('karma').server
    , pkg = require('./package.json')
    , fs = require('fs')

    , testFiles = [
        '*.js'
      , './components/**/*.js'
      , '!Gruntfile.js'
      , '!gulpfile.js'
      , '!lib/**'
      , '!node_modules/**'
      , '!config/**'
    ]
    , jsFiles = [].concat(testFiles, '!**/*_test.js')
    , htmlFiles = ['*.html', 'components/**/*.html']
    , cssFiles = ['./styles/app.scss', './components/**/*.scss']
    , buildTarget = './build' //where to build to
    , cachebustfile = '/cachebust.json'; //file that the cachebust data goes in


//gulp tasks for ALM
gulp.task('stage', ['build'], function () {
    'use strict';
});

gulp.task('prod', ['build'], function () {
    'use strict';
});

gulp.task('dev', ['build'], function () {
    'use strict';
});
//END Taks for ALM

gulp.task('default', ['local'], function () {
    'use strict';
});

gulp.task('local', ['sass'], function () {
    'use strict';
    //start up browsersync
    browserSync({
        server: {
            baseDir: "./"
        }
    });

    //set the file watchers and walk away
    gulp.watch(testFiles, ['test']);
    gulp.watch(htmlFiles, ['templates', 'test', browserSync.reload]);
    gulp.watch(jsFiles, ['test', browserSync.reload]);
    gulp.watch(cssFiles, ['sass', browserSync.reload]);
});

gulp.task('build', ['sass', 'js', 'libs', 'images', 'cachebust'], function build() {
    'use strict';

    fs.writeFile(buildTarget + cachebustfile, JSON.stringify(cachebust.mappings));

    return gulp.src('index.html')
        .pipe(useref())
        .pipe(cachebust.references())
        .pipe(gulp.dest(buildTarget));
});

gulp.task('test', ['jshint', 'templates'], function test(done) {
    'use strict';

    return karma.start({
        configFile: __dirname + '/config/karma.conf.js'
        , singleRun: true
    }, done);
});

gulp.task('sass', function sass() {
    'use strict';
    //manages all things css and sass.

    return gulp.src('./styles/app.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(buildTarget));
});

gulp.task('cachebust', ['sass', 'js'], function cachebust() {
    'use strict';

    return gulp.src([buildTarget + '/app.css', buildTarget + '/app.js'])
        .pipe(cachebust.resources())
        .pipe(gulp.dest(buildTarget));
});

gulp.task('js', ['test'], function js() {
    'use strict';
    //build the final js output
    return gulp.src([].concat(jsFiles, './build/generated/*.js'))
        .pipe(ngannotate())
        .pipe(stripdebug())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(buildTarget));
});

gulp.task('jshint', function jshint() {
    'use strict';
    //This is the code style enforcement task
    return gulp.src(testFiles)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});

gulp.task('templates', function templates() {
    'use strict';
    //generate our angular templates
    return gulp.src('./components/**/*-template.html')
        .pipe(ngtemplate('ngtemplates.js', {
            module: pkg.name
        }))
        .pipe(gulp.dest(buildTarget + '/generated'));
});

gulp.task('images', function images() {
    'use strict';
   return  gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest(buildTarget + '/img'));
});

gulp.task('libs', function libs() {
    'use strict';
    //copy the bower included libs
    return gulp.src(['./lib/**/*']).pipe(gulp.dest(buildTarget + '/lib'));
});
