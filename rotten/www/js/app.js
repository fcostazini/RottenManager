angular.module('rottenManager', ['ngRoute', 'rottenManager.services', 'rottenManager.controllers'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'partials/main.html'
        })
        .when('/jugadores', {
            controller: 'NewGameCtrl',
            templateUrl: 'partials/jugadores.html'
        })
            .when('/config', {
                controller: 'ConfigCtrl',
                templateUrl: 'partials/configuracion.html'
            })
            .when('/manos', {
                controller: 'ManosCtrl',
                templateUrl: 'partials/manos.html'
            })
        .otherwise({redirectTo: '/'});
    });
