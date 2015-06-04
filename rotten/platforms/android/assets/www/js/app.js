
angular.module('rottenManager', ['ionic', 'rottenManager.services', 'rottenManager.controllers'])
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    
    .state('def', {
      url: '/',
       controller: 'MainCtrl',
       templateUrl: 'partials/main.html'
    })
    
    .state('jugadores', {
      url: '/jugadores',
      controller: 'NewGameCtrl',
		templateUrl: 'partials/jugadores.html'
       
    })
	 .state('config', { url:'/config',
                controller: 'ConfigCtrl',
                templateUrl: 'partials/configuracion.html'
            })
            .state('/manos', { url:'/manos',
                controller: 'ManosCtrl',
                templateUrl: 'partials/manos.html'
            })
            .state('pedirBasas',{ url: '/pedirBasas',
                controller: 'FlowCtrl',
                templateUrl: 'partials/pedirBasas.html'
            })
            .state('marcarBasasHechas',{ url: '/marcarBasasHechas',
                controller: 'FlowCtrl',
                templateUrl: 'partials/marcarBasasHechas.html'
            })
            .state('finRonda', { url: '/finRonda',
                controller: 'FlowCtrl',
                templateUrl: 'partials/tablaPosiciones.html'
            })
	

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');

});
	