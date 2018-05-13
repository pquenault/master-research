(function() {
  'use strict';

  angular
    .module('app')
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'app/home/home.html'
        })
        .when('/research', {
          templateUrl: 'app/research/research.html',
          controller: 'Research',
          controllerAs: 'vm'
        })
        .when('/stats', {
          templateUrl: 'app/stats/stats.html',
          controller: 'Stats',
          controllerAs: 'vm'
        })
        .when('/postSchool', {
          templateUrl: 'app/contribute/post.html',
          controller: 'PostSchool',
          controllerAs: 'vm'
        })
        .when('/postCourse', {
          templateUrl: 'app/contribute/post.html',
          controller: 'PostCourse',
          controllerAs: 'vm'
        })
        .when('/postFormerStudent', {
          templateUrl: 'app/contribute/post.html',
          controller: 'PostFormerStudent',
          controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider
        .hashPrefix('!');
        // .html5Mode(true);
    });

})();
