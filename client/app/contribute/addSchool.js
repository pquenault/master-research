(function() {
  'use strict';

  angular
    .module('app.contribute')
    .controller('AddSchoolCtrl', AddSchoolCtrl);

  function AddSchoolCtrl(DAO) {
    var addSchool = this;

    addSchool.default = {};

    addSchool.reset = function() {
      addSchool.school = angular.copy(addSchool.default);
    };

    addSchool.submit = function(isValid) {
      if (isValid) {
        DAO.postSchool(addSchool.school).then(function(response) {
          console.log(response.status);
        }, function(response) {
          console.log(response.status);
        });
      }
    };

  }

})();
