requirejs.config({
	baseUrl: 'assets/js',

	paths: {
		jquery: 'libs/jquery-2.0.2.min'
	},

	shim: {
		'/_js/lib/underscore/underscore.js': {
			//These script dependencies should be loaded before loading
            //deps: [],
            //Once loaded, use the global 'Backbone' as the module value.
			exports: '_'
		},
		'/_js/lib/backbone/backbone-min.js': {
			//These script dependencies should be loaded before loading
			deps: ['/_js/lib/underscore/underscore.js'],
			//Once loaded, use the global 'Backbone' as the module value.
			exports: 'Backbone'
		}
	}
});

require(['app'], function(App) {
	var temp = new App().init();
});