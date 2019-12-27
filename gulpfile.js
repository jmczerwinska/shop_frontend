'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

gulp.task('sass', () =>
    gulp.src('./sass/**/*.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest('./css'))
  );
 
gulp.task('babel', () =>
    gulp.src('./scripts/**/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dist'))
);

gulp.task('tasks:watch', () => {
    gulp.watch('./sass/**/*.scss', gulp.parallel('sass'));
    gulp.watch('./scripts/**/*.js', gulp.parallel('babel'));
});