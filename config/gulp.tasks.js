var tasks = {
	concats : [
			{name:'core:css:concat:assets',watch:false},
			{name:'core:css:concat:allmodules',watch:true},
			{name:'core:js:concat:allmodules',watch:true},
			{name:'core:js:concat:assets',watch:false},
			{name:'core:js:concat:app',watch:true},
			{name:'grounds:js:concat:app',watch:true},
			{name:'home:js:concat:app',watch:true}
	],
	jade : [
	'core:jade:html',
	'home:jade:html',
	'grounds:jade:html'
	],
	less : [
	'core:less:css',
	'grounds:less:css',
	'home:less:css'
	]

}
module.exports = tasks;