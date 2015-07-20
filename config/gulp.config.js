
var paths = {
	html:{
		'home:jade:html':{
			origin:'public/modules/home/views/development/**/*.jade',
			dest:'public/modules/home/views'
		},
		'login:jade:html':{
				origin:'public/modules/login/views/development/**/*.jade',
				dest:'public/modules/login/views'
		},
		'jade:reload':[
			'app/views/**/*.jade'
		]
	},
	css:{
		'core:css:concat:assets':{
				origin:[
					'public/bower_components/angular-material/angular-material.min.css'
				],
				dest:'public/modules/core/stylesheets',
				outputFileName:'core.all.assets.css'
		},
		'login:css:concat:assets':{
				origin:[
					'public/bower_components/angular-material/angular-material.min.css'
				],
				dest:'public/modules/login/stylesheets',
				outputFileName:'login.all.assets.css'
		},
		'core:less:css':{
				origin:{
						watch:'public/modules/core/stylesheets/development/less/**/*.less',//watch
						compile:[
								'public/modules/core/stylesheets/development/less/*.less',//for compile
								'public/modules/core/stylesheets/development/less/core.styles.less',//for compile
						]
				},
				dest:'public/modules/core/stylesheets'
		},
		'login:less:css':{
				origin:{
						watch:'public/modules/login/stylesheets/development/less/**/*.less',//watch
						compile:[
								'public/modules/login/stylesheets/development/less/*.less',//for compile
								'public/modules/login/stylesheets/development/less/login.styles.less',//for compile
						]
				},
				dest:'public/modules/core/stylesheets'
		}
		
	},
	
	js:{
		'core:js:concat:allmodules':{
					origin:[
						'public/modules/home/javascripts/home.app.js',
						'public/modules/login/javascripts/login.app.js'
					],
					dest:'public/modules/core/javascripts',
					outputFileName:'app.js'
		},
		'core:js:concat:assets':{
					origin:[
						'http://localhost:1337/vorlon.js',
						'public/bower_components/jquery/dist/jquery.min.js',
						'public/bower_components/angular/angular.min.js',
						'public/bower_components/angular-ui-utils/ui-utils.min.js',
						'public/bower_components/angular-animate/angular-animate.min.js'
					],
					dest:'public/modules/core/javascripts',
					outputFileName:'core.all.assets.js'
		},
		'home:js:concat:app':{
			origin:[
				'public/modules/home/javascripts/development/**/.*js'
			],
			dest:'public/modules/home/javascripts',
			outputFileName:'home.app.js'
		},
		'login:js:concat:assets':{
			origin:[
				'bower_components/jquery/jquery.min.js',
				'bower_components/angular/angular.min.js',
				'bower_components/angular-ui-utils/ui-utils.min.js',
				'bower_components/angular-animate/angular-animate.min.js'
			],
			dest:'public/login/javascripts',
			outputFileName:'login.all.assets.js'
		},
		'login:js:concat:app':{
			origin:[
				'public/modules/login/javascripts/development/**/.*js'
			],
			dest:'public/modules/login/javascripts',
			outputFileName:'login.app.js'
		}
	}
}

module.exports.paths = paths;

var tasks = {
	concats : [
			{name:'core:css:concat:assets',watch:false},
			{name:'login:css:concat:assets',watch:false},
			{name:'core:js:concat:allmodules',watch:true},
			{name:'core:js:concat:assets',watch:false},
			{name:'home:js:concat:app',watch:true},
			{name:'login:js:concat:assets',watch:false},
			{name:'login:js:concat:app',watch:true}
	],
	jade : [
	'home:jade:html',
	'login:jade:html'
	],
	less : [
	'core:less:css',
	'login:less:css'
	]

}
module.exports.tasks = tasks;