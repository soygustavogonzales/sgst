
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
				dest:'public/core/stylesheets'
		},
		'login:css:concat:assets':{
				origin:[
					'public/bower_components/angular-material/angular-material.min.css'
				],
				dest:'public/login/stylesheets'
		}
		
	},
	
	js:{
		'core:js:concat:assets':{
			origin:[
				'bower_components/jquery/jquery.min.js',
				'bower_components/angular/angular.min.js',
				'bower_components/angular-ui-utils/ui-utils.min.js',
				'bower_components/angular-animate/angular-animate.min.js'
			],
			dest:'public/core/javascripts'
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