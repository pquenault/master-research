(function() {
  'use strict';

  angular
    .module('app')
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/home/home.html',
          // controller: ''
        })
        .when('/research', {
          templateUrl: 'app/research/research.html',
          controller: 'Research',
          controllerAs: 'research'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider
        .hashPrefix('!');
        // .html5Mode(true);
    });

})();
