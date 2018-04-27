(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'angular-leaflet',
      'app.core',
      'app.layout',
      'app.home',
      'app.research'
    ]);

})();
