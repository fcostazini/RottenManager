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
            .when('/pedirBasas',{
                controller: 'FlowCtrl',
                templateUrl: 'partials/pedirBasas.html'
            })
            .when('/marcarBasasHechas',{
                controller: 'FlowCtrl',
                templateUrl: 'partials/marcarBasasHechas.html'
            })
            .when('/finRonda', {
                controller: 'FlowCtrl',
                templateUrl: 'partials/tablaPosiciones.html'
            })
        .otherwise({redirectTo: '/'});
    });
