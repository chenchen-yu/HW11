// adjust the formattig the html based on the original html
d3.select("#leftbox").attr('class',"col-md-3");
d3.select("#rightbox").attr('class',"col-md-9");

// from data.js
var tableData = data;

// Get a reference to the table body and read the data
var table = d3.select("table");
var tbody = d3.select("tbody");

// Step 1
// get funtions from http://bl.ocks.org/jfreels/6734025
// append all data to table
function tabulate(data, columns) {
    // create a row for each object in the data
		var rows = tbody.selectAll('tr')
		  .data(data)
		  .enter()
		  .append('tr');

		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		  .data(function (row) {
		    return columns.map(function (column) {
		      return {column: column, value: row[column]};
		    });
		  })
		  .enter()
		  .append('td')
		  .text(function (d) { return d.value; });

      // Method 2 - work same using code below
      // tbody.selectAll("tr")
      //   .data(data)
      //   .enter()
      //   .append("tr")
      //   .selectAll("td")
      //   .data(function(row) {
      //     return columns.map(function(column) {
      //       return {
      //         column: column,
      //         value: row[column]
      //       };
      //     });
      //   })
      //   .enter()
      //   .append("td")
      //   .text(function(d) {return d.value;});
	  return table;
}

// tabulate(tableData, ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments']);

// Step 2
// Use D3 `.on` to attach a click handler for the filter data
var button_filter = d3.select("#filter-btn");

button_filter.on("click", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  var emptydata=[];
  var rows = tbody.selectAll('tr').data(emptydata);
  rows.exit().remove();
  var cells = rows.selectAll('td').data(function (row) {
  	    return columns.map(function (column) {
  	      return {column: column, value: row[column]};
  		    });
  		  });
  cells.exit().remove();

  // Select the input element and get the raw HTML node
  var inputDate = d3.select("#datetime").property("value");
  var inputCity = d3.select("#city").property("value");
  var inputState = d3.select("#state").property("value");
  var inputCountry = d3.select("#country").property("value");
  var inputShape = d3.select("#shape").property("value");

	var Datetime = tableData.map (UFO => UFO.datetime);
	var City = tableData.map (UFO => UFO.city);
	var State = tableData.map (UFO => UFO.state);
	var Country = tableData.map (UFO => UFO.country);
	var Shape = tableData.map (UFO => UFO.shape);

  if (inputDate != "" ) { var Datetime = inputDate}
	if (inputCity != "" ) { var City = inputCity}
	if (inputState != "" ) { var State = inputState}
	if (inputCountry != "" ) { var Country = inputCountry}
	if (inputShape != "" ) { var Shape = inputShape}

  // var filteredData = tableData.filter(UFO => UFO.datetime === inputDate);
  var filteredData = tableData.filter(UFO => Datetime.includes(UFO.datetime) &&
																						 City.includes(UFO.city) &&
                                             State.includes(UFO.state) &&
                                             Country.includes(UFO.country) &&
                                             Shape.includes(UFO.shape));

  tabulate(filteredData, ['datetime', 'city', 'state', 'country', 'shape', 'durationMinutes', 'comments']);
});

// Step 3
// clear the filter
var button_clear = d3.select("#clear-btn");

button_clear.on("click", function() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  tbody.selectAll("tr").selectAll("td").remove();
  // tbody.exit().remove();

  var datatime_value = document.getElementById("datetime");
  datatime_value.value="";

  var city_value = document.getElementById("city");
  city_value.value="";

  var state_value = document.getElementById("state");
  state_value.value="";

  var country_value = document.getElementById("country");
  country_value.value="";

  var shape_value = document.getElementById("shape");
  shape_value.value="";

});
