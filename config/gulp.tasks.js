var tasks = {
	concats : [
			{name:'core:css:concat:assets',watch:false},
			{name:'core:css:concat:allmodules',watch:true},
			{name:'core:js:concat:allmodules',watch:true},
			{name:'core:js:concat:assets',watch:false},
			{name:'core:js:concat:app',watch:true},
			{name:'grounds:js:concat:app',watch:true},
			{name:'login:css:concat:assets',watch:false},
			{name:'login:js:concat:app',watch:true},
			{name:'login:js:concat:assets',watch:false},
			{name:'buyer:css:concat:allmodules',watch:true},
			{name:'buyer:css:concat:assets',watch:false},
			{name:'buyer:js:concat:app',watch:true},
			{name:'buyer:js:concat:assets',watch:false},
			{name:'buyer:js:concat:allmodules',watch:true},
			{name:'bindup:js:concat:app',watch:true},
			{name:'home:js:concat:app',watch:true}
	],
	jade : [
	'core:jade:html',
	'home:jade:html',
	'grounds:jade:html',
	'buyer:jade:html',
	'bindup:jade:html',
	'grounds:partials:jade:html'
	],
	less : [
	'core:less:css',
	'grounds:less:css',
	'login:less:css',
	'buyer:less:css',
	'bindup:less:css',
	'home:less:css'
	],
	reload:[
	'views:reload'
	]

}
module.exports = tasks;