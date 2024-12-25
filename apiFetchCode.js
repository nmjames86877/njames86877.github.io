// apiFetchCode.js
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://www.consumerfinance.gov/data-research/consumer-complaints/search/api/v1/?date_received_min=2024-12-01')
        .then(response => response.json())
        .then(data => {
            const complaints = data.hits.hits.map(item => item._source);
            createBarChart(complaints);
            createLineChart(complaints);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function createBarChart(data) {
    const svg = d3.select("#chart").append("svg")
        .attr("width", 960)
        .attr("height", 500);

    const margin = {top: 20, right: 30, bottom: 40, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3.scaleBand().range([0, width]).padding(0.1),
          y = d3.scaleLinear().range([height, 0]);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    x.domain(data.map(d => d.product));
    y.domain([0, d3.max(data, d => d.issue.length)]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10));

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.product))
        .attr("y", d => y(d.issue.length))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.issue.length))
        .on("mouseover", function(event, d) {
            d3.select(this).style("fill", "rgba(0, 255, 255, 0.7)");
            tooltip.transition().duration(200).style("opacity", .9);
            tooltip.html(`Product: ${d.product}<br>Issues: ${d.issue.length}`)
                .style("left", (event.pageX + 5) + "px")
                .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", "rgba(255, 255, 255, 0.3)");
            tooltip.transition().duration(500).style("opacity", 0);
        });

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
}

function createLineChart(data) {
    const svg = d3.select("#line-chart").append("svg")
        .attr("width", 960)
        .attr("height", 500);

    const margin = {top: 20, right: 30, bottom: 40, left: 40},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom;

    const x = d3.scaleTime().range([0, width]),
          y = d3.scaleLinear().range([height, 0]);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const parseTime = d3.timeParse("%Y-%m-%d");

    data.forEach(d => {
        d.date_received = parseTime(d.date_received);
    });

    x.domain(d3.extent(data, d => d.date_received));
    y.domain([0, d3.max(data, d => d.issue.length)]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10));

    g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", d3.line()
            .x(d => x(d.date_received))
            .y(d => y(d.issue.length))
        );
}
