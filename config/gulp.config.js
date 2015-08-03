
var paths = {
	html:{
		'core:jade:html':{
			origin:'public/modules/core/views/development/**/*.jade',
			dest:'public/modules/core/views'
		},
		'home:jade:html':{
			origin:'public/modules/home/views/development/**/*.jade',
			dest:'public/modules/home/views'
		},
		'sales:jade:html':{
			origin:'public/modules/sales/views/development/**/*.jade',
			dest:'public/modules/sales/views'
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
					'public/bower_components/bootstrap/dist/css/bootstrap.min.css',
					'public/bower_components/angular-material/angular-material.min.css'
					//'public/bower_components/fontawesome/css/font-awesome.min.css'
				],
				dest:'public/modules/core/stylesheets',
				outputFileName:'core.all.assets.css'
		},
		'core:css:concat:allmodules':{
				origin:[
					'public/modules/core/stylesheets/core.styles.css',
					'public/modules/home/stylesheets/home.styles.css',
					'public/modules/sales/stylesheets/sales.styles.css'
				],
				dest:'public/modules/core/stylesheets',
				outputFileName:'core.all.modules.css'
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
		},
		'sales:less:css':{
				origin:{
						watch:'public/modules/sales/stylesheets/development/less/**/*.less',//watch
						compile:[
								'public/modules/sales/stylesheets/development/less/*.less',//for compile
								'public/modules/sales/stylesheets/development/less/sales.styles.less',//for compile
						]
				},
				dest:'public/modules/sales/stylesheets'
		}
		
	},
	
	js:{
		'core:js:concat:allmodules':{
					origin:[
						'public/modules/core/javascripts/core.app.js',
						'public/modules/home/javascripts/home.app.js',
						'public/modules/sales/javascripts/sales.app.js'
					],
					dest:'public/modules/core/javascripts',
					outputFileName:'app.js'
		},
		'core:js:concat:app':{
			origin:[
				'public/modules/core/javascripts/development/app/coreApp.js',
				'public/modules/core/javascripts/development/app/providers/*.js',
				'public/modules/core/javascripts/development/app/controllers/*.js',
				'public/modules/core/javascripts/development/app/services/*.js',
				'public/modules/core/javascripts/development/app/directives/*.js',
				'public/modules/core/javascripts/development/app/filters/*.js',
				'public/modules/core/javascripts/development/app/factories/*.js'
				//'public/modules/core/javascripts/development/app/**/*.js'
			],
			dest:'public/modules/core/javascripts',
			outputFileName:'core.app.js'
		},
		'core:js:concat:assets':{
					origin:[
						'http://localhost:1337/vorlon.js',
						'public/bower_components/jquery/dist/jquery.min.js',
						'public/bower_components/angular/angular.min.js',
						//'public/bower_components/angular-ui-utils/ui-utils.min.js',
						'public/bower_components/angucomplete-alt/dist/angucomplete-alt.min.js',
						'public/bower_components/angular-animate/angular-animate.min.js',
						'public/bower_components/angular-sanitize/angular-sanitize.min.js',
						'public/bower_components/angular-aria/angular-aria.min.js',
						'public/bower_components/angular-material/angular-material.min.js',
						'public/bower_components/angular-bootstrap/ui-bootstrap.min.js',
						'public/bower_components/angular-messages/angular-messages.min.js',
						'public/bower_components/angular-local-storage/dist/angular-local-storage.min.js',
						'public/bower_components/angular-ui-router/release/angular-ui-router.min.js'
					],
					dest:'public/modules/core/javascripts',
					outputFileName:'core.all.assets.js'
		},
		'home:js:concat:app':{
			origin:[
				'public/modules/home/javascripts/development/app/homeApp.js',
				'public/modules/home/javascripts/development/app/providers/*.js',
				'public/modules/home/javascripts/development/app/controllers/*.js',
				'public/modules/home/javascripts/development/app/services/*.js',
				'public/modules/home/javascripts/development/app/directives/*.js',
				'public/modules/home/javascripts/development/app/filters/*.js',
				'public/modules/home/javascripts/development/app/factories/*.js'
			],
			dest:'public/modules/home/javascripts',
			outputFileName:'home.app.js'
		},
		'sales:js:concat:app':{
			origin:[
				'public/modules/sales/javascripts/development/app/salesApp.js',
				'public/modules/sales/javascripts/development/app/providers/*.js',
				'public/modules/sales/javascripts/development/app/controllers/*.js',
				'public/modules/sales/javascripts/development/app/services/*.js',
				'public/modules/sales/javascripts/development/app/directives/*.js',
				'public/modules/sales/javascripts/development/app/filters/*.js',
				'public/modules/sales/javascripts/development/app/factories/*.js'
			],
			dest:'public/modules/sales/javascripts',
			outputFileName:'sales.app.js'
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
			{name:'core:css:concat:allmodules',watch:true},
			{name:'core:js:concat:allmodules',watch:true},
			{name:'core:js:concat:assets',watch:false},
			{name:'core:js:concat:app',watch:true},
			{name:'home:js:concat:app',watch:true},
			{name:'sales:js:concat:app',watch:true},
			{name:'login:css:concat:assets',watch:false},
			{name:'login:js:concat:assets',watch:false},
			{name:'login:js:concat:app',watch:true}
	],
	jade : [
	'core:jade:html',
	'home:jade:html',
	'sales:jade:html',
	'login:jade:html'
	],
	less : [
	'core:less:css',
	'login:less:css',
	'sales:less:css'
	]

}
module.exports.tasks = tasks;