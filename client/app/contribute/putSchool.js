(function() {
  'use strict';

  angular
    .module('app.contribute')
    .controller('PutSchool', PutSchool);

  function PutSchool(DAO) {
    var vm = this;

    vm.title = 'Modifier une école';

    vm.conf = {
      name: {
        id: "schoolNameId",
        name: "schoolNameName",
        type: "text",
        placeholder: "Nom",
        kind: "input",
        maxlength: 128,
        required: true
      },
      acronym: {
        id: "schoolAcronymId",
        name: "schoolAcronymName",
        type: "text",
        placeholder: "Acronyme",
        kind: "input",
        maxlength: 32,
        required: true
      },
      url: {
        id: "schoolUrlId",
        name: "schoolUrlName",
        type: "text",
        placeholder: "Adresse web",
        kind: "input",
        maxlength: 256,
        required: true
      },
      postalCode: {
        id: "schoolPostalCodeId",
        name: "schoolPostalCodeName",
        type: "text",
        placeholder: "Code postal",
        kind: "input",
        maxlength: 16,
        required: true
      },
      city: {
        id: "schoolCityId",
        name: "schoolCityName",
        type: "text",
        placeholder: "Ville",
        kind: "input",
        maxlength: 64,
        required: true
      },
      region: {
        id: "schoolRegionId",
        name: "schoolRegionName",
        type: "text",
        placeholder: "Région",
        kind: "select",
        required: true,
        options: [
          {
            value: "Auvergne-Rhône-Alpes",
            bind: "Auvergne-Rhône-Alpes"
          },
          {
            value: "Bourgogne-Franche-Comté",
            bind: "Bourgogne-Franche-Comté"
          },
          {
            value: "Bretagne",
            bind: "Bretagne"
          },
          {
            value: "Centre-Val de Loire",
            bind: "Centre-Val de Loire"
          },
          {
            value: "Corse",
            bind: "Corse"
          },
          {
            value: "Grand Est",
            bind: "Grand Est"
          },
          {
            value: "Hauts-de-France",
            bind: "Hauts-de-France"
          },
          {
            value: "Île-de-France",
            bind: "Île-de-France"
          },
          {
            value: "Normandie",
            bind: "Normandie"
          },
          {
            value: "Nouvelle-Aquitaine",
            bind: "Nouvelle-Aquitaine"
          },
          {
            value: "Occitanie",
            bind: "Occitanie"
          },
          {
            value: "Pays de la Loire",
            bind: "Pays de la Loire"
          },
          {
            value: "Provence-Alpes-Côte d'Azur",
            bind: "Provence-Alpes-Côte d'Azur"
          },
          {
            value: "Guadeloupe",
            bind: "Guadeloupe"
          },
          {
            value: "Guyane (française)",
            bind: "Guyane (française)"
          },
          {
            value: "Martinique",
            bind: "Martinique"
          },
          {
            value: "La Réunion",
            bind: "La Réunion"
          },
          {
            value: "Mayotte",
            bind: "Mayotte"
          }
        ]
      },
      country: {
        id: "schoolCountryId",
        name: "schoolCountryName",
        type: "text",
        placeholder: "Pays",
        kind: "input",
        maxlength: 64,
        required: true
      }
    };

    vm.default = {
      name: "",
      acronym: "",
      url: "",
      postalCode: "",
      city: "",
      region: "",
      country: "",
      location: {
        type: "Point",
        coordinates: []
      }
    };

    var schoolId = '5ade8b8431926c20a93a1552';
    // Get school
    DAO.getSchool(schoolId).then(function(response) {
      vm.default = response.data;
      vm.temp = angular.copy(vm.default);
    }, function(response) {
      console.log('Error during getSchool');
    });

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
        DAO.getCoordinates(vm.temp.name, vm.temp.city).then(function(response) {
          if (response.data.status == 'OK') {
            vm.temp.location.coordinates = [response.data.results[0].geometry.location.lat, response.data.results[0].geometry.location.lng];
            console.log('Success during getCoordinates with status : '+response.status);
            DAO.putSchool(vm.temp._id, vm.temp).then(function(response) {
              vm.alert = 'success';
              vm.message = 'Votre modification à bien été pris en compte !';
              console.log('Success during putSchool with status : '+response.status);
            }, function(response) {
              vm.alert = 'error';
              vm.message = 'Notre base de données est très certainement en maintenance, merci de réessayer plus tard.';
              console.log('Error during putSchool with status : '+response.status);
            });
          } else {
            vm.alert = 'error';
            vm.message = 'Les informations fournies ne nous ont pas permis de localiser cette école.';
            console.log('Error during getCoordinates with status : '+response.data.status);
          }
        }, function(response) {
          vm.alert = 'error';
          vm.message = 'Notre service de localisation est probablement en panne.';
          console.log('Error during getCoordinates with status : '+response.status);
        });
      } else {
        vm.alert = 'warning';
        vm.message = 'Le formulaire est invalide.'
        console.log('Form invalid');
      }
    };
  }

})();
