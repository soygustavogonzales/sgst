
var paths = {
	jade:{
		'jade:html':{
			origin:'public/modules/*/views/development/*.jade',
			dest:'public/modules/*/views'
		},
		'jade:reload':[
			'app/views'
		]
	},
	css:{
		'core:css:concat:assets':{
				origin:[
					'public/bower_components/angular-material/angular-material.min.css'
				],
				dest:'public/modules/core/stylesheets',
				name:'all.assets.css'
		},
		'login:css:concat:assets':{
				origin:[
					'public/bower_components/angular-material/angular-material.min.css'
				],
				dest:'public/login/stylesheets',
				name:'all.assets.css'
		},
		'core:less:css':{
				origin:{
						watch:'public/modules/core/stylesheets/development/less/**/*.less',//watch
						compile:[
								'public/modules/core/stylesheets/development/less/*.less',//for compile
								'public/modules/core/stylesheets/development/less/core.styles.less',//for compile
						]
				},
				dest:'public/modules/core/stylesheets',
				name:'core.styles.css'
		}
		
	},
	
	js:{
		'core:js:concat:assets':{
			origin:[
				'public/bower_components/jquery/dist/jquery.min.js',
				'public/bower_components/angular/angular.min.js',
				'public/bower_components/angular-ui-utils/ui-utils.min.js',
				'public/bower_components/angular-animate/angular-animate.min.js'
			],
			dest:'public/modules/core/javascripts'
		},
		'login:js:concat:assets':{
			origin:[
				'bower_components/jquery/jquery.min.js',
				'bower_components/angular/angular.min.js',
				'bower_components/angular-ui-utils/ui-utils.min.js',
				'bower_components/angular-animate/angular-animate.min.js'
			],
			dest:'public/login/javascripts'
		}
	}
}

module.exports = paths;