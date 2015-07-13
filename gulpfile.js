var gulp = require('gulp'),
	less = require('gulp-less'), 
	path = require('path'),
	concat = require('gulp-concat');
	/*
	minifyCss = require('gulp-minify-css'),
	jsmin = require('gulp-jsmin'),
	rename = require('gulp-rename'),
	gutil = require('gulp-util'),
	liveReload = require('gulp-livereload'),
	shell = require('gulp-shell'),
	gulp_config = require('./config/gulp.config.js');

	*/
	gulp.task('default',function(){
		console.log("***")
	})
	gulp.task('core:js:concat:assets',function(){

			return gulp.src(gulp_config.js['core:js:concat:assets'].origin)
							.pipe(concat(gulp_config.js['core:js:concat:assets'].dest))

	})