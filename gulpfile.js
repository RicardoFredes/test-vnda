var gulp = require('gulp'),
	clean = require('gulp-clean'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-clean-css'),
	uglify = require('gulp-uglify-es').default,
	minifyjs = require('gulp-js-minify');

gulp.task('clean', function(){
	return gulp.src('dist', {read: false})
		.pipe(clean());
});

gulp.task('copy:img', function() {
	return gulp.src('src/img/**/*')
		.pipe(gulp.dest('dist/img/'));
});

gulp.task('copy:files', function() {
	gulp.src('src/index.html')
		.pipe(gulp.dest('dist'));
	gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('build:img', ['copy:img'], function(){
	return gulp.src('dist/img/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('sass', function(){
	return gulp.src('src/sass/style.sass')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', function(){
	return gulp.watch('src/sass/*', ['sass']).on('change', function(){
		// console.log('recompilado');
	});
});

gulp.task('build:css', ['sass'], function(){
	return gulp.src('src/css/style.css')
		.pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
		.pipe(cssmin({compatibility: 'ie8'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('build:js', function(){
	return gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe(minifyjs())
		.pipe(gulp.dest('dist/js'));
});

gulp.task('build', ['clean'], function(){
	return gulp.start('copy:files', 'build:img', 'build:css', 'build:js');
});