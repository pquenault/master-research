(function() {
  'use strict';

  angular
    .module('app.research')
    .controller('ResearchCtrl', ResearchCtrl);

  function ResearchCtrl(DAO) {
    var research = this;

    DAO.getCourseFormerStudents('5adf51e9d53d9517409aacd4').then(function(response) {
      research.data = response.data;
      console.log(response.status);
    }, function(response) {
      console.log(response.status);
    });
  }

})();
