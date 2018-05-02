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
          controller: 'ResearchCtrl',
          controllerAs: 'research'
        })
        .when('/addSchool', {
          templateUrl: 'app/contribute/addSchool.html',
          controller: 'AddSchoolCtrl',
          controllerAs: 'addSchool'
        })
        .when('/addCourse', {
          templateUrl: 'app/contribute/addCourse.html',
          controller: 'AddCourseCtrl',
          controllerAs: 'addCourse'
        })
        .when('/addFormerStudent', {
          templateUrl: 'app/contribute/addFormerStudent.html',
          controller: 'AddFormerStudentCtrl',
          controllerAs: 'addFormerStudent'
        })
        .otherwise({
          redirectTo: '/'
        });

      $locationProvider
        .hashPrefix('!');
        // .html5Mode(true);
    });

})();
