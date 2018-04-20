(function() {
  'use strict';

  angular
    .module('app.research')
    .controller('Research', Research);

  function Research($http) {
    var vm = this;

    $http({
      method: 'GET',
      url: 'http://localhost:3000/formation'
    }).then(function successCallback(response){
      vm.test = response.data;
      console.log('success');
    }, function errorCallback(response){
      console.log('error');
    });
  };

})();
