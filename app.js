
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
        margin = {top: 20, right: 50, bottom: 40, left: 150},
        width = parseInt(d3.select('#graphsvg').style('width'))


        console.log(width)
        var width = width - margin.left - margin.right,
        graphRatio = .6,
        height = width * graphRatio;

        ;
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);

    var g = svg.append("g")
    		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.json("data.json", function(error, data) {
      	if (error) throw error;

      	data.sort(function(a, b) { return a.value - b.value; });

      	x.domain([0, d3.max(data, function(d) { return d.value; })]);
        y.domain(data.map(function(d) { return d.area; })).padding(0.1);

        g.append("g")
            .attr("class", "x axis")
           	.attr("transform", "translate(0," + height + ")")
          	.call(d3.axisBottom(x).ticks(5).tickFormat(function(d) { return parseInt(d); }).tickSizeInner([-height]));

        g.append("g")
            .attr("class", "y axis")
            .call(d3.axisLeft(y));

        g.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", 0)
            .attr("height", y.bandwidth())
            .attr("y", function(d) { return y(d.area); })
            .attr("width", function(d) { return x(d.value); })
            .on("mousemove", function(d){
          // Replace hard coded vals (50, 90) with 50% of the tooltip wioth and height + a top buffer
                tooltip
                  .style("left", d3.event.pageX - 40 + "px")
                  .style("top", d3.event.pageY - 60 + "px")
                  .style("display", "inline-block")
                  .html((d.area) + "<br><span>" + (d.value) + "% </span>");
            })
        		.on("mouseout", function(d){ tooltip.style("display", "none");});

        g.append("text")
        .attr("text-anchor", "middle")
        .attr("x", width/2)
        .attr("y", height+35)
        .text("Percent of activity in havens")
        .style("font-weight", 700)
    });
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
