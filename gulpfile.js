var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
    	stream: true
    }))
});


gulp.task('browserSync', function(){
	browserSync.init({
		server: {
			baseDir: 'app'
		}
	});
});

gulp.task('serve',['browserSync','sass'], function(){
	gulp.watch('app/scss/**/*.scss',['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/**/*.js', browserSync.reload);
});

