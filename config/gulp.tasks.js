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
			{name:'login:js:concat:app',watch:true},
			{name:"sales@info:js:concat:app",watch:true}
	],
	jade : [
	'core:jade:html',
	'home:jade:html',
	'sales:jade:html',
	'sales@info:jade:html',
	'login:jade:html'
	],
	less : [
	'core:less:css',
	'login:less:css',
	'sales:less:css',
	'sales@info:less:css'
	]

}
module.exports = tasks;