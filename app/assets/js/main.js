requirejs.config({
	baseUrl: 'assets/js',

	paths: {
		jquery: 'libs/jquery-2.0.2.min'
	},

	shim: {
		'libs/underscore-min': {
			exports: '_'
		},
		'libs/backbone-min': {
			deps: ['libs/underscore-min'] , exports: 'Backbone'
		}
	}
});

require(['app'], function(App) {
	var temp = new App().init();
});