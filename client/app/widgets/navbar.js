(function() {
  'use strict';

  angular
    .module('app.widgets')
    .controller('NavbarCtrl', NavbarCtrl);

  function NavbarCtrl($location) {
    var navbar = this;

    navbar.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }

})();
