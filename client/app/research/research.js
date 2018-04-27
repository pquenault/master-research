(function() {
  'use strict';

  angular
    .module('app.research')
    .controller('Research', Research);

  function Research(DAO) {
    var vm = this;

    DAO.getCourseFormerStudents('5adf51e9d53d9517409aacd4').then(function(response) {
      vm.data = response.data;
      console.log(response.status);
    }, function(response) {
      console.log(response.status);
    });


  };

})();
