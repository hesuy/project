/*  */
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    combiner = require('stream-combiner2'),
    minifycss = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');


var handleError = function (err) {
    var colors = gutil.colors;
    console.log('\n')
    gutil.log(colors.red('Error!'))
    gutil.log('fileName: ' + colors.red(err.fileName))
    gutil.log('lineNumber: ' + colors.red(err.lineNumber))
    gutil.log('message: ' + err.message)
    gutil.log('plugin: ' + colors.yellow(err.plugin))
}


//语法检查
gulp.task('jshint', function () {
    return gulp.src('src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('uglifyjs', function () {
    var combined = combiner.obj([
        gulp.src('src/js/**/*.js')
            .pipe(concat('main.js'))    //合并所有js到main.js
            .pipe(gulp.dest('dist/js/'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify())
            .pipe(gulp.dest('dist/js/'))
    ])
    combined.on('error', handleError)
})

gulp.task('minifycss', function () {
    gulp.src('src/css/**/*.css')
        .pipe(autoprefixer({
          browsers: 'last 2 versions'
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))
})

gulp.task('image', function () {
    gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('dist/images'))
})


gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['jshint', 'uglifyjs']);
    gulp.watch('src/css/**/*.css', ['minifycss']);
    gulp.watch('src/images/**/*', ['image']);
})


gulp.task('default', [
    'jshint', 'uglifyjs', 'minifycss', 'image', 'watch'
    ]
)
