module.exports = 
{
	"html": {
		"core:jade:html": {
			"origin": "public/modules/core/views/development/**/*.jade",
			"dest": "public/modules/core/views"
		},
		"home:jade:html": {
			"origin": "public/modules/home/views/development/**/*.jade",
			"dest": "public/modules/home/views"
		},
		"grounds:jade:html": {
			"origin": "public/modules/grounds/views/development/*.jade",
			"dest": "public/modules/grounds/views"
		},
		"grounds:partials:jade:html": {
			"origin": "public/modules/grounds/views/development/partials/**/*.jade",
			"dest": "public/modules/grounds/views/partials"
		}
	},
	"css": {
		"core:css:concat:assets": {
			"origin": [
				"public/bower_components/bootstrap/dist/css/bootstrap.min.css",
				"public/bower_components/angucomplete-alt/angucomplete-alt.css",
				"public/bower_components/angular-material/angular-material.min.css"
			],
			"dest": "public/modules/core/stylesheets",
			"outputFileName": "core.all.assets.css"
		},
		"core:css:concat:allmodules": {
			"origin": [
				"public/modules/core/stylesheets/core.styles.css",
				"public/modules/home/stylesheets/home.styles.css",
				"public/modules/grounds/stylesheets/grounds.styles.css"
			],
			"dest": "public/modules/core/stylesheets",
			"outputFileName": "core.all.modules.css"
		},
		"core:less:css": {
			"origin": {
				"watch": "public/modules/core/stylesheets/development/less/**/*.less",
				"compile": [
					"public/modules/core/stylesheets/development/less/*.less",
					"public/modules/core/stylesheets/development/less/core.styles.less"
				]
			},
			"dest": "public/modules/core/stylesheets",
			"path_dependencies": [
				"public/modules/core/stylesheets/development/less"
			]
		},
		"grounds:less:css": {
			"origin": {
				"watch": "public/modules/grounds/stylesheets/development/less/**/*.less",
				"compile": [
					"public/modules/grounds/stylesheets/development/less/*.less",
					"public/modules/grounds/stylesheets/development/less/grounds.styles.less"
				]
			},
			"dest": "public/modules/grounds/stylesheets",
			"path_dependencies": [
				"public/modules/core/stylesheets/development/less"
			]
		},
		"home:less:css": {
			"origin": {
				"watch": "public/modules/home/stylesheets/development/less/**/*.less",
				"compile": [
					"public/modules/home/stylesheets/development/less/*.less",
					"public/modules/home/stylesheets/development/less/home.styles.less"
				]
			},
			"dest": "public/modules/home/stylesheets",
			"path_dependencies": [
				"public/modules/core/stylesheets/development/less"
			]
		}
	},
	"js": {
		"core:js:concat:allmodules": {
			"origin": [
				"public/modules/core/javascripts/core.app.js",
				"public/modules/home/javascripts/home.app.js",
				"public/modules/grounds/javascripts/grounds.app.js"
			],
			"dest": "public/modules/core/javascripts",
			"outputFileName": "app.js"
		},
		"core:js:concat:app": {
			"origin": [
				"public/modules/core/javascripts/development/app/coreApp.js",
				"public/modules/core/javascripts/development/app/providers/*.js",
				"public/modules/core/javascripts/development/app/controllers/*.js",
				"public/modules/core/javascripts/development/app/services/*.js",
				"public/modules/core/javascripts/development/app/directives/*.js",
				"public/modules/core/javascripts/development/app/filters/*.js",
				"public/modules/core/javascripts/development/app/factories/*.js"
			],
			"dest": "public/modules/core/javascripts",
			"outputFileName": "core.app.js"
		},
		"core:js:concat:assets": {
			"origin": [
				"http://localhost:1337/vorlon.js",
				"public/bower_components/jquery/dist/jquery.min.js",
				"public/bower_components/angular/angular.min.js",
				"public/bower_components/angucomplete-alt/dist/angucomplete-alt.min.js",
				"public/bower_components/angular-animate/angular-animate.min.js",
				"public/bower_components/angular-sanitize/angular-sanitize.min.js",
				"public/bower_components/angular-aria/angular-aria.min.js",
				"public/bower_components/angular-material/angular-material.min.js",
				"public/bower_components/angular-bootstrap/ui-bootstrap.min.js",
				"public/bower_components/angular-messages/angular-messages.min.js",
				"public/bower_components/angular-local-storage/dist/angular-local-storage.min.js",
				"public/bower_components/angular-ui-router/release/angular-ui-router.min.js",
				"public/bower_components/lodash/lodash.min.js",
				"public/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js",
				"public/bower_components/angular-google-maps/dist/angular-google-maps.min.js",
				"public/bower_components/ng-image-input-with-preview/dist/ng-image-input-with-preview.min.js",
				"https://maps.googleapis.com/maps/api/js?sensor=false"
			],
			"dest": "public/modules/core/javascripts",
			"outputFileName": "core.all.assets.js"
		},
		"home:js:concat:app": {
			"origin": [
				"public/modules/home/javascripts/development/app/homeApp.js",
				"public/modules/home/javascripts/development/app/providers/*.js",
				"public/modules/home/javascripts/development/app/controllers/*.js",
				"public/modules/home/javascripts/development/app/services/*.js",
				"public/modules/home/javascripts/development/app/directives/*.js",
				"public/modules/home/javascripts/development/app/filters/*.js",
				"public/modules/home/javascripts/development/app/factories/*.js"
			],
			"dest": "public/modules/home/javascripts",
			"outputFileName": "home.app.js"
		},
		"grounds:js:concat:app": {
			"origin": [
				"public/modules/grounds/javascripts/development/app/groundsApp.js",
				"public/modules/grounds/javascripts/development/app/providers/*.js",
				"public/modules/grounds/javascripts/development/app/controllers/*.js",
				"public/modules/grounds/javascripts/development/app/services/*.js",
				"public/modules/grounds/javascripts/development/app/directives/*.js",
				"public/modules/grounds/javascripts/development/app/filters/*.js",
				"public/modules/grounds/javascripts/development/app/factories/*.js"
			],
			"dest": "public/modules/grounds/javascripts",
			"outputFileName": "grounds.app.js"
		}
	}
}