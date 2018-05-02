(function() {
  'use strict';

  angular
    .module('app.research')
    .controller('ResearchCtrl', ResearchCtrl);

  function ResearchCtrl(DAO) {
    var research = this;

    DAO.getCourses().then(function(response) {
      research.courses = response.data;
      console.log(research.courses.length);
    }, function(response) {
      console.log(response.courses);
    });

    research.onMapInitialized = function(map) {
      research.leaflet = map;
      research.leaflet.setView([46.61,2.72]);
      research.leaflet.setZoom(6);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    		maxZoom: 18,
    		id: 'mapbox.streets',
    		accessToken: 'pk.eyJ1IjoicHBlcmdldCIsImEiOiJjamZibjlibzcyNXgyMnhucjFxemc5YWQxIn0.ZTNERHrUn5YkoD6sUEJx_Q'
    	}).addTo(research.leaflet);

      var masterIcon = L.icon({
        iconUrl: 'assets/img/master-icon.png',
        shadowUrl: 'assets/img/master-icon.png',

        iconSize:     [32, 48], // size of the icon
        shadowSize:   [32, 48], // size of the shadow
        iconAnchor:   [32, 48], // point of the icon which will correspond to marker's location
        shadowAnchor: [32, 48],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      DAO.getSchools().then(function(response){
        research.schools = response.data
        var list = research.schools;
        console.log(research.schools.length)
        for(var i = 0;i<list.length;i++){
            L.marker(list[i].location.coordinates, {icon: masterIcon}).addTo(research.leaflet);
            //console.log(list[i], list[i].location.coordinates);
        }
      });
};


  }

})();
