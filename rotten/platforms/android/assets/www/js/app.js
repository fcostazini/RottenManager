angular.module('rottenManager', ['ngRoute', 'rottenManager.services', 'rottenManager.controllers'])
    .config(function ($routeProvider) {
        $routeProvider
        .when('/', {
            controller: 'MainCtrl',
            templateUrl: 'partials/main.html'
        })
        .when('/newGame', {
            controller: 'NewGameCtrl',
            templateUrl: 'partials/newGame.html'
        })
        .otherwise({redirectTo: '/'});
    });
