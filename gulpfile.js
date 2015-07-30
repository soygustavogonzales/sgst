var gulp = require('gulp'),
	config = require('config'),
	less = require('gulp-less'),
	minifyCss = require('gulp-minify-css') ,
	path = require('path'),
	jade = require('gulp-jade'),
	liveReload = require('gulp-livereload'),
	concat = require('gulp-concat'),
	gulp_config = require('./config/gulp.config.js'),
	tasks = gulp_config.tasks,
	paths = gulp_config.paths,
	l = console.log;
	/*
	minifyCss = require('gulp-minify-css'),
	jsmin = require('gulp-jsmin'),
	rename = require('gulp-rename'),
	gutil = require('gulp-util'),
	shell = require('gulp-shell'),
	*/
	function less2css(opt){
				gulp.task(opt.taskName,function(){
				return gulp.src(opt.origin)
				.pipe(less({
						paths:[path.join(__dirname,'less','includes')]
				}))
				//.pipe(minifyCss())
				.pipe(gulp.dest(opt.dest))
				.pipe(liveReload())
			});
	}

	function jade2html(opt){

		gulp.task(opt.taskName,function(){
			return gulp.src(opt.origin)
											.pipe(jade({
													//client:true,
													pretty:true
												}))
											.pipe(gulp.dest(opt.dest))
											.pipe(liveReload())
		});

	};

	function concatFiles(opt){
				gulp.task(opt.taskName,function(){
						return gulp.src(opt.origin)
													.pipe(concat(opt.outputFileName,{newLine:'\n'}))
													.pipe(gulp.dest(opt.dest))
													.pipe(liveReload())
				});
				
	};

	function initTaskDevelopment(){

		tasks.concats.forEach(function(task){
			var taskName  = task.name
			var exPatrn = /(:js:)|(:css:)|(:less:)/.exec(taskName);
			var type = exPatrn?(exPatrn[0]).split(":")[1]:null;
			if(type){
				var opt_ = {
						taskName:taskName,
						origin:paths[type][taskName].origin,
						outputFileName:paths[type][taskName].outputFileName,
						dest:paths[type][taskName].dest
				} 
				concatFiles(opt_)
			}
			switch(true){
				case(task.watch):
					//console.log(task);
					gulp.watch(paths[type][taskName].origin,[taskName])
					break;
				default:
					gulp.start(taskName)
			}

		});

			tasks.jade.forEach(function(taskName){
			jade2html({
					taskName:taskName,
					origin:paths.html[taskName].origin,
					dest:paths.html[taskName].dest
			})

			gulp.watch(paths.html[taskName].origin,[taskName])
			/*
			*/

		});

			tasks.less.forEach(function(taskName){
				
				less2css({
						taskName:taskName,
						origin:paths.css[taskName].origin.compile[1],
						dest:paths.css[taskName].dest,
				})
			
				gulp.watch(paths.css[taskName].origin.watch,[taskName])

			})
		
		}//.initDevelopment

gulp.task('jade:reload', function(){
	return gulp.src(paths.html['jade:reload'])
	.pipe(liveReload())
});

gulp.task('default',function(){
		//console.log('NODE_ENV: ' + config.util.getEnv('NODE_ENV'));
		if(config.util.getEnv('NODE_ENV') === "development"){
				initTaskDevelopment()
				gulp.watch(paths.html['jade:reload'],["jade:reload"])
				liveReload.listen()
		}
});