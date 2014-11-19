var
  gulp = require('gulp'),
  stripdebug = require('gulp-strip-debug'),
  uglify = require('gulp-uglify');

var  
  source = 'src/',
  dest = 'js/';

// strip debugging and minify JS
gulp.task('js', function() {
  return gulp.src(source)
    .pipe(stripdebug())
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

// default task
gulp.task('default', ['js'], function() {

  // watch for javascript changes
  gulp.watch(js.in, ['js']);

});
