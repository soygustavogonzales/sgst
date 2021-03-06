module.exports = 
{
	"html": {
		"core:jade:html": {
			"origin": "public/modules/core/views/development/**/*.jade",
			"dest": "public/modules/core/views"
		},
		"buyer:jade:html": {
			"origin": "public/modules/buyer/views/development/**/*.jade",
			"dest": "public/modules/buyer/views"
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
		},
		"bindup:jade:html": {
			"origin": "public/modules/bindup/views/development/*.jade",
			"dest": "public/modules/bindup/views"
		},
		"bindup:partials:jade:html": {
			"origin": "public/modules/bindup/views/development/partials/**/*.jade",
			"dest": "public/modules/bindup/views/partials"
		},
		"views:reload":{
			"origin":"app/views/**.jade"
		}
	},
	"css": {
		"login:css:concat:assets": {
			"origin": [
				"public/bower_components/bootstrap/dist/css/bootstrap.min.css",
				"public/bower_components/angucomplete-alt/angucomplete-alt.css",
				"public/bower_components/angular-material/angular-material.min.css",
				"public/bower_components/angular-loading-bar/build/loading-bar.min.css"
			],
			"dest": "public/modules/login/stylesheets",
			"outputFileName": "login.all.assets.css"
		},
		"login:less:css": {
			"origin": {
				"watch": "public/modules/login/stylesheets/development/less/**/*.less",
				"compile": [
					"public/modules/login/stylesheets/development/less/*.less",
					"public/modules/login/stylesheets/development/less/login.styles.less"
				]
			},
			"dest": "public/modules/login/stylesheets",
			"path_dependencies": [
				"public/modules/login/stylesheets/development/less"
			]
		},
		"buyer:css:concat:assets": {
			"origin": [
				"public/bower_components/bootstrap/dist/css/bootstrap.min.css",
				"public/bower_components/angucomplete-alt/angucomplete-alt.css",
				"public/bower_components/angular-material/angular-material.min.css",
				"public/bower_components/angular-loading-bar/build/loading-bar.min.css"
			],
			"dest": "public/modules/buyer/stylesheets",
			"outputFileName": "buyer.all.assets.css"
		},
		"buyer:css:concat:allmodules": {
			"origin": [
				"public/modules/buyer/stylesheets/buyer.styles.css",
				"public/modules/bindup/stylesheets/bindup.styles.css"
			],
			"dest": "public/modules/buyer/stylesheets",
			"outputFileName": "buyer.all.modules.css"
		},
		"buyer:less:css": {
			"origin": {
				"watch": "public/modules/buyer/stylesheets/development/less/**/*.less",
				"compile": [
					"public/modules/buyer/stylesheets/development/less/*.less",
					"public/modules/buyer/stylesheets/development/less/buyer.styles.less"
				]
			},
			"dest": "public/modules/buyer/stylesheets",
			"path_dependencies": [
				"public/modules/buyer/stylesheets/development/less"
			]
		},
		"core:css:concat:assets": {
			"origin": [
				"public/bower_components/bootstrap/dist/css/bootstrap.min.css",
				"public/bower_components/angucomplete-alt/angucomplete-alt.css",
				"public/bower_components/angular-material/angular-material.min.css",
				"public/bower_components/angular-loading-bar/build/loading-bar.min.css"
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
		"bindup:less:css": {
			"origin": {
				"watch": "public/modules/bindup/stylesheets/development/less/**/*.less",
				"compile": [
					"public/modules/bindup/stylesheets/development/less/*.less",
					"public/modules/bindup/stylesheets/development/less/bindup.styles.less"
				]
			},
			"dest": "public/modules/bindup/stylesheets",
			"path_dependencies": [
				"public/modules/buyer/stylesheets/development/less"
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
		"login:js:concat:app": {
			"origin": [
				"public/modules/login/javascripts/development/app/loginApp.js",
				"public/modules/login/javascripts/development/app/providers/*.js",
				"public/modules/login/javascripts/development/app/controllers/*.js",
				"public/modules/login/javascripts/development/app/services/*.js",
				"public/modules/login/javascripts/development/app/directives/*.js",
				"public/modules/login/javascripts/development/app/filters/*.js",
				"public/modules/login/javascripts/development/app/factories/*.js"
			],
			"dest": "public/modules/login/javascripts",
			"outputFileName": "login.app.js"
		},
		"login:js:concat:assets": {
			"origin": [
				"public/bower_components/jquery/dist/jquery.min.js",
				"public/bower_components/angular/angular.min.js",
				"public/bower_components/angular-animate/angular-animate.min.js",
				"public/bower_components/angular-sanitize/angular-sanitize.min.js",
				"public/bower_components/angular-aria/angular-aria.min.js",
				"public/bower_components/angular-cookies/angular-cookies.min.js",
				"public/bower_components/angular-material/angular-material.min.js",
				"public/bower_components/angular-messages/angular-messages.min.js",
				"public/bower_components/angular-local-storage/dist/angular-local-storage.min.js",
				"public/bower_components/angular-ui-router/release/angular-ui-router.min.js",
				"public/bower_components/lodash/lodash.min.js",
				"public/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js",
				"public/bower_components/angular-resource/angular-resource.min.js"
			],
			"dest": "public/modules/login/javascripts",
			"outputFileName": "login.all.assets.js"
		},
		"buyer:js:concat:allmodules": {
			"origin": [
				"public/modules/buyer/javascripts/buyer.app.js",
				"public/modules/bindup/javascripts/bindup.app.js"
			],
			"dest": "public/modules/buyer/javascripts",
			"outputFileName": "app.js"
		},
		"buyer:js:concat:app": {
			"origin": [
				"public/modules/buyer/javascripts/development/app/buyerApp.js",
				"public/modules/buyer/javascripts/development/app/providers/*.js",
				"public/modules/buyer/javascripts/development/app/controllers/*.js",
				"public/modules/buyer/javascripts/development/app/services/*.js",
				"public/modules/buyer/javascripts/development/app/directives/*.js",
				"public/modules/buyer/javascripts/development/app/filters/*.js",
				"public/modules/buyer/javascripts/development/app/factories/*.js"
			],
			"dest": "public/modules/buyer/javascripts",
			"outputFileName": "buyer.app.js"
		},
		"buyer:js:concat:assets": {
			"origin": [
				"http://localhost:1337/vorlon.js",
				"public/bower_components/jquery/dist/jquery.min.js",
				"public/bower_components/angular/angular.min.js",
				"public/bower_components/angucomplete-alt/dist/angucomplete-alt.min.js",
				"public/bower_components/angular-animate/angular-animate.min.js",
				"public/bower_components/angular-loading-bar/build/loading-bar.min.js",
				"public/bower_components/angular-sanitize/angular-sanitize.min.js",
				"public/bower_components/angular-aria/angular-aria.min.js",
				"public/bower_components/angular-material/angular-material.min.js",
				"public/bower_components/angular-bootstrap/ui-bootstrap.min.js",
				"public/bower_components/angular-cookies/angular-cookies.min.js",
				"public/bower_components/angular-messages/angular-messages.min.js",
				"public/bower_components/angular-local-storage/dist/angular-local-storage.min.js",
				"public/bower_components/angular-ui-router/release/angular-ui-router.min.js",
				"public/bower_components/lodash/lodash.min.js",
				"public/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js",
				"public/bower_components/angular-google-maps/dist/angular-google-maps.min.js",
				"public/bower_components/ng-image-input-with-preview/dist/ng-image-input-with-preview.min.js",
				"public/bower_components/angular-resource/angular-resource.min.js",
				"public/bower_components/firebase/firebase.js",
				"public/bower_components/angularfire/dist/angularfire.min.js",
				"https://maps.googleapis.com/maps/api/js?sensor=false"
			],
			"dest": "public/modules/buyer/javascripts",
			"outputFileName": "buyer.all.assets.js"
		},
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
				"public/bower_components/angular-loading-bar/build/loading-bar.min.js",
				"public/bower_components/angular-sanitize/angular-sanitize.min.js",
				"public/bower_components/angular-aria/angular-aria.min.js",
				"public/bower_components/angular-material/angular-material.min.js",
				"public/bower_components/angular-bootstrap/ui-bootstrap.min.js",
				"public/bower_components/angular-cookies/angular-cookies.min.js",
				"public/bower_components/angular-messages/angular-messages.min.js",
				"public/bower_components/angular-local-storage/dist/angular-local-storage.min.js",
				"public/bower_components/angular-ui-router/release/angular-ui-router.min.js",
				"public/bower_components/lodash/lodash.min.js",
				"public/bower_components/angular-simple-logger/dist/angular-simple-logger.min.js",
				"public/bower_components/angular-google-maps/dist/angular-google-maps.min.js",
				"public/bower_components/ng-image-input-with-preview/dist/ng-image-input-with-preview.min.js",
				"public/bower_components/angular-resource/angular-resource.min.js",
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
		},
		"bindup:js:concat:app": {
			"origin": [
				"public/modules/bindup/javascripts/development/app/bindupApp.js",
				"public/modules/bindup/javascripts/development/app/providers/*.js",
				"public/modules/bindup/javascripts/development/app/controllers/*.js",
				"public/modules/bindup/javascripts/development/app/services/*.js",
				"public/modules/bindup/javascripts/development/app/directives/*.js",
				"public/modules/bindup/javascripts/development/app/filters/*.js",
				"public/modules/bindup/javascripts/development/app/factories/*.js"
			],
			"dest": "public/modules/bindup/javascripts",
			"outputFileName": "bindup.app.js"
		}
	}
}