var gulp = require('gulp'),
	config = require('config'),
	less = require('gulp-less'), 
	path = require('path'),
	liveReload = require('gulp-livereload'),
	concat = require('gulp-concat'),
	gulp_config = require('./config/gulp.config.js');
	/*
	minifyCss = require('gulp-minify-css'),
	jsmin = require('gulp-jsmin'),
	rename = require('gulp-rename'),
	gutil = require('gulp-util'),
	shell = require('gulp-shell'),
	*/

	gulp.task('default',function(){
		console.log("***")
		console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
	})
	gulp.task('core:js:concat:assets',function(){
		console.log(gulp_config.js['core:js:concat:assets'].origin);
		console.log(gulp_config.js['core:js:concat:assets'].dest);
			return gulp.src(gulp_config.js['core:js:concat:assets'].origin)
								.pipe(concat('all.assets.js',{newLine:';'}))
							.pipe(gulp.dest(gulp_config.js['core:js:concat:assets'].dest))

	})