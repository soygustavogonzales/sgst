var gulp = require('gulp'),
	config = require('config'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css') ,
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


	gulp.task('core:js:concat:assets',function(){
			return gulp.src(gulp_config.js['core:js:concat:assets'].origin)
								.pipe(concat('all.assets.js',{newLine:';'}))
							.pipe(gulp.dest(gulp_config.js['core:js:concat:assets'].dest))

	});

	gulp.task('core:less:css',function(){
		return gulp.src(gulp_config.css['core:less:css'].origin.compile[1])
		.pipe(less({
				paths:[path.join(__dirname,'less','includes')]
		}))
		//.pipe(minifyCss())
		.pipe(gulp.dest(gulp_config.css['core:less:css'].dest))
	});

	gulp.task('core:css:concat:assets',function(){
		return gulp.src(gulp_config.css['core:css:concat:assets'].origin)
									.pipe(concat('all.assets.css'))
									.pipe(gulp.dest(gulp_config.css['core:css:concat:assets'].dest))
	});

gulp.task('watch',function(){
	gulp.watch(gulp_config.css['core:less:css'].origin.watch,['core:less:css'])
});

gulp.task('default',function(){
		//console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
		if(config.util.getEnv('NODE_ENV') === "development"){
			gulp.start('core:css:concat:assets')
			gulp.start('core:js:concat:assets')
			gulp.run('watch')
		}
});