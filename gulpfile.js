var del = require('del');
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var templateCache = require('gulp-angular-templatecache');

gulp.task('default', ['build']);

gulp.task('build', ['templates', 'dist', 'clean']);

gulp.task('dist', ['templates'], function() {
  return gulp.src(['angular-date-pickable.js', 'build/temp-templates.js'])
    .pipe(concat('angular-date-pickable.js'))
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename('angular-date-pickable.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('templates', function() {
  return gulp.src('angular-date-pickable.html')
    .pipe(templateCache('temp-templates.js', { module: 'jbDatePickable' }))
    .pipe(gulp.dest('build'));
});

gulp.task('clean', ['templates', 'dist'], function() {
  return del(['build']);
});

gulp.task('watch', ['build'], function() {
  gulp.watch('angular-date-pickable.*', ['build']);
});
