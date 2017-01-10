// Load plugins
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    lr = require('tiny-lr'),
    server = lr();


// Scripts
gulp.task('scripts', function() {
  return gulp.src('/javascripts/dummy.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});
