define(function (require) {

	"use strict";

	var $ = require('jquery'),
	Backbone = require('backbone'),
	PageSlider = require('app/utils/pageslider'),
	HomeView = require('app/views/Home'),
	slider = new PageSlider($('body')),

	homeView = new HomeView();

	return Backbone.Router.extend({

		routes : {
			"" : "home",
			"nuevo" : "configuracion",
			"load" : "jugadores"
		},

		home : function () {
			homeView.delegateEvents();
			slider.slidePage(homeView.$el);
		},

		configuracion : function () {
			require(["app/views/Configuracion"], function (Configuracion) {
				slider.slidePage(new Configuracion().$el);
			});
		},

		jugadores : function () {
			require(["app/views/Jugadores"], function (Jugadores) {
				slider.slidePage(new Jugadores().$el);

			});
		}
	});

});
