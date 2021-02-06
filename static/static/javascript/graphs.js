


//$("select").change(function () {
  //  var tf = $("#selDataset option:selected").text();
    //$.getJSON($SCRIPT_ROOT + "/data", {
      //  tf: $("#selDataset option:selected").text()

    //}, function (data) {
        //chart functions
      //  console.log(data.newinfo)
    //})

//});
var price_point_app = data.map(row=>row.price_point_app);
var names = ["Free", "Not Free"];

function init()
{
    var dropdownMenu = d3.select("#selDataset");
    d3.json("/data").then((dataset)=>
        {
            console.log(dataset);
            var sampleNames = names;
            console.log(sampleNames)
            sampleNames.forEach((sample)=>
            {
                dropdownMenu.append("option").text(sample).property("value",sample);
            });
            var first = sampleNames[0]

            console.log(first)
            buildplots(first)
        });
}
init();



function buildplots(sample) {
    d3.json("/data").then((data) => {

        var sampleMetadata = data;
        var results = sampleMetadata.filter(s=>s.price_point_app == sample);
        console.log(results);

        var developer = results.map(row=>row.developer);
        console.log(developer)
        var primary_genre = results.map(row=>row.primary_genre);
        console.log(primary_genre)
        var number_of_games = results.map(row=>row.number_of_games);
        console.log(number_of_games)


        var total_number_of_raters = results.map(row=>row.total_number_of_raters);
        console.log(total_number_of_raters)
        var avg_user_rating = results.map(row=>row.avg_user_rating);
        console.log(avg_user_rating)
        var price_point_app = results.map(row=>row.price_point_app);
        console.log(price_point_app)

        var countTrace = 
        {
            x: number_of_games.slice(0, 10).reverse(), //count of games
            y: developer.slice(0, 10).map(value => `${value}`).reverse(), //developers
            type: "bar",
            text: developer.slice(0, 10).reverse(), //count of games?developers?
            orientation: "h"
        };
        var countData = [countTrace];
        var countLayout =
        {
            title: "Count of Games by Developer", //Count of Games by Developer
            xaxis: { title: "# of Games" }, //# of Games
            margin: {l: 200}
        };
        Plotly.newPlot("bar", countData, countLayout);

    
        var usersTrace = 
        {
          x: total_number_of_raters.slice(0,10).reverse(), //count of users per game by developer
          y: developer.slice(0,10).map(value=>`${value}`).reverse(), //developers
          type: "bar",
          text: developer.slice(0,10).reverse(), //count of games?developers?
          orientation: "h"
        };
        var usersData = [usersTrace];
        var usersLayout = 
        {
          title: "Avg Number of Users per Game by Developer",
          xaxis: { title: "Avg Number of Users Per Game"},
          margin: {l: 200}
        };
        Plotly.newPlot("bar2", usersData, usersLayout);



        var ratingTrace = 
        {
          x: avg_user_rating.slice(0,10).reverse(), //ratings
          y: developer.slice(0,10).map(value=>`${value}`).reverse(), //developers
          type: "bar",
          text: developer.slice(0,10).reverse(), //ratings?developers?
          orientation: "h"
        };
        var ratingData = [ratingTrace];
        var ratingLayout = 
        {
          title: "Avg Rating by Developer", //Avg Rating by Developer
          xaxis: { title: "Avg Rating"}, //Avg Rating
          margin: {l: 200}
        };
        Plotly.newPlot("bar3", ratingData, ratingLayout);


        var bubbleTrace = 
        {
          x: avg_user_rating,
          y: total_number_of_raters,
          mode: "markers",
          marker: 
          {
              color: price_point_app,
              size: number_of_games
          },
          text: price_point_app
        };
        var bubbleData = [bubbleTrace];
        var bubbleLayout = 
        {
          title: "Bubble",
          xaxis: { title: "Average User Ratings"},
          yaxis: { title: "Total Number of Raters"}
        };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);


    });
};


function optionChanged(sample){

 buildplots(sample);
};
