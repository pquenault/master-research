(function() {
  'use strict';

  angular
    .module('app.contribute')
    .controller('PostCourse', PostCourse);

  function PostCourse(DAO) {
    var vm = this;

    vm.title = 'Ajouter une formation';

    // Get school options
    vm.options = [];
    DAO.getSchools().then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        vm.options.push({
          value: response.data[i]._id,
          bind: response.data[i].name
        });
      }
    }, function(response) {
      console.log('Error during getSchools');
    });

    vm.conf = {
      name: {
        id: "courseNameId",
        name: "courseNameName",
        type: "text",
        placeholder: "Nom",
        kind: "input",
        maxlength: 128,
        required: true
      },
      acronym: {
        id: "courseAcronymId",
        name: "courseAcronymName",
        type: "text",
        placeholder: "Acronyme",
        kind: "input",
        maxlength: 32,
        required: true
      },
      url: {
        id: "courseUrlId",
        name: "courseUrlName",
        type: "text",
        placeholder: "Adresse web",
        kind: "input",
        maxlength: 256,
        required: true
      },
      type: {
        id: "courseTypeId",
        name: "courseTypeName",
        type: "text",
        placeholder: "Type",
        kind: "input",
        maxlength: 32,
        required: true
      },
      school: {
        id: "courseSchoolId",
        name: "courseSchoolName",
        type: "text",
        placeholder: "École",
        kind: "select",
        required: true,
        options: vm.options
      }
    };

    vm.default = {
      name: "",
      acronym: "",
      url: "",
      type: "",
      school: ""
    };

    vm.temp = angular.copy(vm.default);
    vm.alert = '';
    vm.message = 'Merci par avance de la part de jeunes étudiants en quête d\'informations.';

    vm.reset = function(form) {
      vm.temp = angular.copy(vm.default);
      vm.alert = '';
      vm.message = 'Le formulaire a bien été réinitialisé.';
      form.$setPristine();
    };

    vm.submit = function(isValid) {
      if (isValid) {
        DAO.postCourse(vm.temp).then(function(response) {
          vm.alert = 'success';
          vm.message = 'Votre ajout à bien été pris en compte !';
          console.log('Success during postSchool with status : '+response.status);
        }, function(response) {
          vm.alert = 'error';
          vm.message = 'Notre base de données est très certainement en maintenance, merci de réessayer plus tard.';
          console.log('Error during postSchool with status : '+response.status);
        });
      } else {
        vm.alert = 'warning';
        vm.message = 'Le formulaire est invalide.'
        console.log('Form invalid');
      }
    };
  }

})();
