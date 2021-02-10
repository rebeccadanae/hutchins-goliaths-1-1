
!(function() {
  function analytics(action) {
    var label =
      1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : "null";
    window.dataLayer.push({
      event: "Interactive",
      category: "Interactive",
      action: action,
      label: label
    });
  }
  function app() {
    var graph_container = d3.select("#graph-1-container")
    var svg = d3.select("#graphsvg"),
        margin = {top: 20, right: 50, bottom: 20, left: 150},
        width = parseInt(d3.select('#graphsvg').style('width'))


        console.log(width)
        var width = width - margin.left - margin.right,
        graphRatio = .5,
        height = width * graphRatio;

        ;
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    // Parse the Data
    d3.csv("new_data.csv", function(data) {

      // List of subgroups = header of the csv files = soil condition here
      var subgroups = data.columns.slice(1)

      // List of groups = species here = value of the first column called group -> I show them on the X axis
      var groups = d3.map(data, function(d){return(d.group)}).keys()



      // Add Y axis
      var y = d3.scaleLinear()
        .domain([0, 100])
        .range([ height, 0 ]);
      svg.append("g")
      .attr("transform", "translate(" + margin.left + "," +  margin.top + ")")
        .call(d3.axisLeft(y).tickSizeInner([-width]).tickSizeOuter(0).ticks(5))
        .attr("class", "y-axis")
      // color palette = one color per subgroup
      var color = d3.scaleOrdinal()
        .domain(subgroups)
        .range(['#003a70','#8ac6ff'])

      //stack the data? --> stack per subgroup
      var stackedData = d3.stack()
        .keys(subgroups)
        (data)
        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])
        svg.append("g")
          .attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
          .call(d3.axisBottom(x).tickSizeOuter(0).tickSize(0))
          .attr("class", "x-axis")
          .selectAll("text")
      .attr("y", margin.bottom-5)
      .attr("x", -5)
      .attr("dy", ".35em")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");
      // Show the bars
      svg.append("g")
        .selectAll("g")
        // Enter in the stack data = loop key per key = group per group
        .data(stackedData)
        .enter().append("g")
          .attr("fill", function(d) { return color(d.key); })
          .selectAll("rect")
          // enter a second time = loop subgroup per subgroup to add all rectangles
          .data(function(d) { return d; })
          .enter().append("rect")
            .attr("x", function(d) { return x(d.data.group); })
            .attr("transform", "translate(" + margin.left + "," +  margin.top + ")")
            .attr("y", function(d) { return y(d[1]*100); })
            .attr("height", function(d) { return y(d[0]*100) - y(d[1]*100); })
            .attr("width",x.bandwidth())
    })

  }



  document.addEventListener(
    "readystatechange",
    function() {
      "interactive" === document.readyState && app();
    },
    !1
  );
})();
//# sourceMappingURL=./app.js.map
