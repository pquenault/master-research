(function() {
  'use strict';

  angular
    .module('app', [
      'ngRoute',
      'ui.bootstrap',
      'chart.js',
      'app.core',
      'app.widgets',
      'app.home',
      'app.research',
      'app.stats',
      'app.contribute'
    ]);

})();
