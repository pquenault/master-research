(function() {
  'use strict';

  angular
    .module('app')
    .config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          title: 'Accueil',
          templateUrl: 'app/home/home.html'
        })
        .when('/research', {
          title: 'Recherche',
          templateUrl: 'app/research/research.html',
          controller: 'Research',
          controllerAs: 'vm'
        })
        .when('/stats', {
          title: 'Statistiques',
          templateUrl: 'app/stats/stats.html',
          controller: 'Stats',
          controllerAs: 'vm'
        })
        .when('/postSchool', {
          title: 'Ajouter une école',
          templateUrl: 'app/contribute/post.html',
          controller: 'PostSchool',
          controllerAs: 'vm'
        })
        .when('/putSchool', {
          title: 'Modifier une école',
          templateUrl: 'app/contribute/put.html',
          controller: 'PutSchool',
          controllerAs: 'vm'
        })
        .when('/postCourse', {
          title: 'Ajouter une formation',
          templateUrl: 'app/contribute/post.html',
          controller: 'PostCourse',
          controllerAs: 'vm'
        })
        .when('/putCourse', {
          title: 'Modifier une formation',
          templateUrl: 'app/contribute/put.html',
          controller: 'PutCourse',
          controllerAs: 'vm'
        })
        .when('/postFormerStudent', {
          title: 'Ajouter un ancien étudiant',
          templateUrl: 'app/contribute/post.html',
          controller: 'PostFormerStudent',
          controllerAs: 'vm'
        })
        .when('/putFormerStudent', {
          title: 'Modifier un ancien étudiant',
          templateUrl: 'app/contribute/put.html',
          controller: 'PutFormerStudent',
          controllerAs: 'vm'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider
        .hashPrefix('!');
        // .html5Mode(true);
    })
    .run(function($rootScope, $route) {
      $rootScope.$on('$routeChangeSuccess', function() {
        document.title = $route.current.title;
      });
    });

})();
