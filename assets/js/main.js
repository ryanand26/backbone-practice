/*jslint browser: true, evil: false, jquery:true, forin: true, white: false, devel:true */
/*!
 * Primary file for site scripting
 * Author: Ryan Mitchell (2013) (http://www.looseideas.co.uk)
 * Date : 
 * @version 0.0.1
**/
(function (window, $, Backbone, undefined) {
	"use strict"; // http://dmitrysoshnikov.com/ecmascript/es5-chapter-2-strict-mode/

	//Main/Root object
	var _bbEx = window.bbEx || {};

	_bbEx = (function (_bbEx) {
		//private variables
		var $window = $(window),
			dataUrl = 'data/transactions.json';

		//public variables
		_bbEx.ltIE9 = false;

		var FinancialTransaction = Backbone.Model.extend({
			defaults: {
				"ChartStyle" : "4",
				"ChartType" : "1"
			}
		});

		//root data
		var FinancialTransactions = Backbone.Collection.extend({
			model: FinancialTransaction,
			url: dataUrl
		});

		window.ListItemView = Backbone.View.extend({
			template: "#pfm-item-template",
			tagName: 'tr',
			className: 'ftd-item',

			initialize: function () {
				_.bindAll(this, 'render');
				this.template = _.template($(this.template).html());

				//this.player.bind('change:state', this.updateState);
				this.model.bind('change', this.render);
			},

			initializeTemplate: function () {
				this.template = _.template($(this.template).html());
			},

			render: function () {
				$(this.el).html(this.template(this.model.toJSON()));
				return this;
			}
		});

		var ListView = Backbone.View.extend({
			template: "#pfm-template",
			tagName: 'table',
			className: 'ftd',

			initialize: function () {
				_.bindAll(this, 'render');
				this.template = _.template($(this.template).html());

				this.collection.bind('change', this.render);
				this.collection.bind('reset', this.render);
			},

			render: function () {

				var collection = this.collection,
					parentNode = $(this.el).html(this.template({})).find('tbody');

				this.collection.each(function (item) {
					var view = new ListItemView({
						model: item,
						collection: collection
					});
					parentNode.append(view.render().el);
				});

				return this;
			}
		});

		/**
		* Init call for Main JS
		* Called on document ready
		*/
		_bbEx.init = function () {
			var ftd = new FinancialTransactions(),
				view;

			ftd.fetch({
				success : function () {
					view = new ListView({ collection : ftd });

					$("#container").append(view.render().el);
				}
			});


			return this;
		};

		//return out new object
		return _bbEx;

	}(_bbEx));

	//expose the root object to global scope.
	window.bbEx = _bbEx;

	$(document).ready(_bbEx.init);

	
}(window, jQuery, Backbone));

