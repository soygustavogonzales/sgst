var paths = {
	html:{
		'{[moduleName]}:jade:html':{
			origin:'public/modules/{[moduleName]}/views/development/**/*.jade',
			dest:'public/modules/{[moduleName]}/views'
		}
	},
	css:{
		'{[moduleName]}:css:concat:assets':{
			origin:[
			],
			dest:'public/modules/{[moduleName]}/stylesheets',
			outputFileName:'{[moduleName]}.all.assets.css'
		}
		'{[moduleName]}:css:concat:allmodules':{
				origin:[
					'public/modules/{[moduleName]}/stylesheets/{[moduleName]}.styles.css'
				],
				dest:'public/modules/{[moduleName]}/stylesheets',
				outputFileName:'{[moduleName]}.all.modules.css'
		},
		'{[moduleName]}:less:css':{
				origin:{
						watch:'public/modules/{[moduleName]}/stylesheets/development/less/**/*.less',//watch
						compile:[
								'public/modules/{[moduleName]}/stylesheets/development/less/*.less',//for compile
								'public/modules/{[moduleName]}/stylesheets/development/less/{[moduleName]}.styles.less'//for compile
						]
				},
				dest:'public/modules/{[moduleName]}/stylesheets',
				path_dependencies:['public/modules/{[moduleName]}/stylesheets/development/less']
		},
	},
	js:{
		'{[moduleName]}:js:concat:allmodules':{
					origin:[
						'public/modules/{[moduleName]}/javascripts/{[moduleName]}.app.js'
					],
					dest:'public/modules/{[moduleName]}/javascripts',
					outputFileName:'app.js'
		},
		'{[moduleName]}:js:concat:app':{
			origin:[
				'public/modules/{[moduleName]}/javascripts/development/app/{[moduleName]}App.js',
				'public/modules/{[moduleName]}/javascripts/development/app/providers/*.js',
				'public/modules/{[moduleName]}/javascripts/development/app/controllers/*.js',
				'public/modules/{[moduleName]}/javascripts/development/app/services/*.js',
				'public/modules/{[moduleName]}/javascripts/development/app/directives/*.js',
				'public/modules/{[moduleName]}/javascripts/development/app/filters/*.js',
				'public/modules/{[moduleName]}/javascripts/development/app/factories/*.js'
				//'public/modules/{[moduleName]}/javascripts/development/app/**/*.js'
			],
			dest:'public/modules/{[moduleName]}/javascripts',
			outputFileName:'{[moduleName]}.app.js'
		},
		'{[moduleName]}:js:concat:assets':{
					origin:[
					],
					dest:'public/modules/{[moduleName]}/javascripts',
					outputFileName:'{[moduleName]}.all.assets.js'
		},
	}
};