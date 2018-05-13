(function() {
  'use strict';

  angular
    .module('app.contribute')
    .controller('PostCourse', PostCourse);

  function PostCourse(DAO) {
    var vm = this;

    vm.title = 'Ajouter une formation';
  }

})();
