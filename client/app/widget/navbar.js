(function() {
  'use strict';

  angular
    .module('app.widget')
    .controller('NavbarCtrl', NavbarCtrl);

  function NavbarCtrl($location) {
    var navbar = this;

    navbar.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  }

})();
