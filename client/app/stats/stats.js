(function() {
  'use strict';

  angular
    .module('app.stats')
    .controller('Stats', Stats);

  function Stats(DAO) {
    var vm = this;

    vm.schools = [];
    vm.courses = [];
    vm.formerStudents = [];
    vm.data = [];

    function fillData(data, name, distinction) {
      for (var i = 0; i < data.length; i++) {
      	if (data[i].Universite === name) {
          data[i][distinction] += 1;
          return data;
        }
      }
      var obj = {
        "Universite": name,
        "Passable": 0,
        "Assez bien": 0,
        "Bien": 0,
        "Tres bien": 0
      };
      obj[distinction] += 1;
      data.push(obj);
      return data;
    }

    // Get schools
    DAO.getSchools().then(function(response) {
    	vm.schools = response.data;

      // Get courses
      DAO.getCourses().then(function(response) {
        vm.courses = response.data;

        // Get former students
        DAO.getFormerStudents().then(function(response) {
          vm.formerStudents = response.data;

          for (var i = 0; i < vm.formerStudents.length; i++) {
            if (vm.formerStudents[i].hasDone.length != 0 && vm.formerStudents[i].hasDone[0].course != '') {
              var schoolId = vm.courses.find(course => course._id === vm.formerStudents[i].hasDone[0].course).school;
              var schoolName = vm.schools.find(school => school._id === schoolId).name;
              switch (vm.formerStudents[i].distinction) {
                case 'Passable':
                  vm.data = fillData(vm.data, schoolName, 'Passable');
                  break;
                case 'Assez bien':
                  vm.data = fillData(vm.data, schoolName, 'Assez bien');
                  break;
                case 'Bien':
                  vm.data = fillData(vm.data, schoolName, 'Bien');
                  break;
                case 'Très bien':
                  vm.data = fillData(vm.data, schoolName, 'Tres bien');
                  break;
                default:
                  console.log('Error')
              }
            }
          }

    			var data = vm.data;
          var svg = d3.select("svg"),
    			margin = {top: 20, right: 20, bottom: 30, left: 40},
    			width = +svg.attr("width") - margin.left - margin.right,
    			height = +svg.attr("height") - margin.top - margin.bottom,
    			g = svg.append("g").attr("viewBox", "0 0 700 500").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    			var x0 = d3.scaleBand()
      			.rangeRound([0, width])
      			.paddingInner(0.1);

    			var x1 = d3.scaleBand()
      			.padding(0.05);

    			var y = d3.scaleLinear()
      			.rangeRound([height, 0]);

    			var z = d3.scaleOrdinal()
      			.range(["#ff530d", "#bdd4de", "#3f5765", "#2b3a42"]);

    			data.columns = [
    			  "Universite",
    			  "Passable",
    			  "Assez bien",
    			  "Bien",
    			  "Tres bien"
    			];

    			var keys = data.columns.slice(1);

    			x0.domain(data.map(function(d) { return d.Universite; }));
    			x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    			y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice().tickFormat(d3.format("d"));

    			g.append("g")
    		    .selectAll("g")
    		    .data(data)
    			  .enter().append("g")
    			  .attr("transform", function(d) { return "translate(" + x0(d.Universite) + ",0)"; })
    			  .selectAll("rect")
    			  .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    			  .enter().append("rect")
    			  .attr("x", function(d) { return x1(d.key); })
    			  .attr("y", function(d) { return y(d.value); })
    			  .attr("width", x1.bandwidth())
    			  .attr("height", function(d) { return height - y(d.value); })
    			  .attr("fill", function(d) { return z(d.key); });

    		  g.append("g")
    			  .attr("class", "axis")
    			  .attr("transform", "translate(0," + height + ")")
    			  .call(d3.axisBottom(x0));

    		  g.append("g")
    			  .attr("class", "axis")
    			  .call(d3.axisLeft(y).ticks(null, "s"))
    			  .append("text")
    			  .attr("x", 2)
    			  .attr("y", y(y.ticks().pop()) + 0.5)
    			  .attr("dy", "0.32em")
    			  .attr("fill", "white")
    			  .attr("font-weight", "bold")
    			  .attr("text-anchor", "start")
    			  .text("Nombre de mentions");

    		  var legend = g.append("g")
    			  .attr("font-family", "sans-serif")
    			  .attr("font-size", 10)
    			  .attr("text-anchor", "end")
    			  .selectAll("g")
    			  .data(keys.slice().reverse())
    			  .enter().append("g")
    			  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    		  legend.append("rect")
    			  .attr("x", width - 19)
    			  .attr("width", 19)
    			  .attr("height", 19)
    			  .attr("fill", z);

    		  legend.append("text")
    			  .attr("x", width - 24)
    			  .attr("y", 9.5)
    			  .attr("dy", "0.32em")
    			  .text(function(d) { return d; });
				}, function(response) {
				  console.log('Error during getformerStudents');
				});
		  }, function(response) {
			console.log('Error during getCourses');
		  });
		}, function(response) {
			console.log('Error during getSchools');
		});
  }

})();
