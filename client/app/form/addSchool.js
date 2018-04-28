(function() {
  'use strict';

  angular
    .module('app.form')
    .controller('AddSchoolCtrl', AddSchoolCtrl);

  function AddSchoolCtrl(DAO) {
    var addSchool = this;

    addSchool.default = {name:"sample"};

    addSchool.reset = function() {
        addSchool.school = angular.copy(addSchool.default);
    };
    
  }

})();
