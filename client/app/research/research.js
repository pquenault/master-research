(function() {
  'use strict';

  angular
    .module('app.research')
    .controller('Research', Research);

  function Research($scope, DAO) {
    var vm = this;

    vm.contentType = 'list';
    vm.research = '';
    vm.category = 'Écoles';

    vm.changeCategory = function() {
      if (vm.category === 'Formations') {
        vm.category = 'Écoles';
      } else {
        vm.category = 'Formations';
      }
    };

    vm.reset = function() {
      vm.research = '';
      vm.category = 'Écoles';
    };

    function obj(obj, id) {
      return obj._id === id;
    }

    vm.school = {};
    vm.showSchool = function(schoolId) {
      vm.contentType = 'element';
      vm.school = vm.schools.find(school => school._id === schoolId);
    };

    vm.course = {};
    vm.showCourse = function(courseId) {
      vm.contentType = 'element';
      vm.course = vm.courses.find(course => course._id === courseId);
    };

    // Map base settings
    var map = L.map('mapid');
    map.setView([46.61, 2.72]);
    map.setZoom(6);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  		maxZoom: 18,
  		id: 'mapbox.streets',
  		accessToken: 'pk.eyJ1IjoicHBlcmdldCIsImEiOiJjamZibjlibzcyNXgyMnhucjFxemc5YWQxIn0.ZTNERHrUn5YkoD6sUEJx_Q'
  	}).addTo(map);

    // Get schools
    vm.schools = [];
    DAO.getSchools().then(function(response) {
      vm.schools = response.data;

      // Map markers
      var schoolIcon = L.icon({
        iconUrl: 'assets/img/master-icon.png',
        shadowUrl: 'assets/img/master-icon.png',
        iconSize: [32, 48],
        shadowSize: [32, 48],
        iconAnchor: [16, 32],
        shadowAnchor: [16, 32],
        popupAnchor: [0, -32]
      });
      var markers = L.markerClusterGroup({
        maxClusterRadius: 30
      });
      for (var i = 0; i < vm.schools.length; i++) {
        markers
          .addLayer(
            L.marker(vm.schools[i].location.coordinates, {icon: schoolIcon})
              .bindPopup(vm.schools[i].name)
              .on('click', function(e) {
                var mc = e.target.getLatLng();
                for (var i = 0; i < vm.schools.length; i++) {
                  var sc = vm.schools[i].location.coordinates;
                  if (mc.lat === sc[0] && mc.lng === sc[1]) {
                    DAO.getSchoolCourses(vm.schools[i]._id).then(function(response) {
                      var research = '';
                      for (var key in response.data) {
                        research += response.data[key].name;
                      }
                      vm.research = research;
                      // $scope.$digest();
                    }, function(response) {
                      console.log('Error during getSchoolCourses');
                    });
                    break;
                  }
                }
              })
          );
      }
      map.addLayer(markers);
    }, function(response) {
      console.log('Error during getSchools');
    });

    // Get courses
    vm.courses = [];
    DAO.getCourses().then(function(response) {
      vm.courses = response.data;
    }, function(response) {
      console.log('Error during getCourses');
    });
  }

})();
