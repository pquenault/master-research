(function() {
  'use strict';

  angular
    .module('app.contribute')
    .controller('PostFormerStudent', PostFormerStudent);

  function PostFormerStudent(DAO) {
    var vm = this;

    vm.title = 'Ajouter un ancien étudiant';

    // Get course options
    vm.options = [];
    DAO.getCourses().then(function(response) {
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
        id: "formerStudentNameId",
        name: "formerStudentNameName",
        type: "text",
        placeholder: "Prénom",
        kind: "input",
        maxlength: 64,
        required: true
      },
      surname: {
        id: "formerStudentSurnameId",
        name: "formerStudentSurnameName",
        type: "text",
        placeholder: "Nom",
        kind: "input",
        maxlength: 64,
        required: true
      },
      email: {
        id: "formerStudentEmailId",
        name: "formerStudentEmailName",
        type: "email",
        placeholder: "Email",
        kind: "input",
        maxlength: 128,
        required: true
      },
      graduation: {
        id: "formerStudentGraduationId",
        name: "formerStudentGraduationName",
        type: "text",
        placeholder: "Année d'obtention du diplôme",
        kind: "input",
        maxlength: 4,
        required: true
      },
      curriculum: {
        id: "formerStudentCurriculumId",
        name: "formerStudentCurriculumName",
        type: "text",
        placeholder: "Cursus",
        kind: "select",
        required: true,
        options: [
          {
            value: "L1-L2-L3 à Champollion",
            bind: "L1-L2-L3 à Champollion"
          },
          {
            value: "IUT Informatique + L3 champollion",
            bind: "IUT Informatique + L3 champollion"
          },
          {
            value: "L2-L3 à Champollion",
            bind: "L2-L3 à Champollion"
          },
          {
            value: "Autre cursus",
            bind: "Autre cursus"
          }
        ]
      },
      distinction: {
        id: "formerStudentDistinctionId",
        name: "formerStudentDistinctionName",
        type: "text",
        placeholder: "Mention",
        kind: "select",
        required: true,
        options: [
          {
            value: "Passable",
            bind: "Passable"
          },
          {
            value: "Assez bien",
            bind: "Assez bien"
          },
          {
            value: "Bien",
            bind: "Bien"
          },
          {
            value: "Très bien",
            bind: "Très bien"
          }
        ]
      }
    };

    vm.default = {
      name: "",
      surname: "",
      email: "",
      graduation: "",
      curriculum: "",
      distinction: "",
      hasDone: []
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
        DAO.postFormerStudent(vm.temp).then(function(response) {
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
