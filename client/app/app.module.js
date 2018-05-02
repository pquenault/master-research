(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ui.bootstrap',
      'angular-leaflet',
      'app.core',
      'app.widget',
      'app.home',
      'app.research',
      'app.contribute'
    ]);

})();
