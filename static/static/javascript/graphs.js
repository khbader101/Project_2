


$("select").change(function () {
    var tf = $("#selDataset option:selected").text();
    $.getJSON($SCRIPT_ROOT + "/data", {
        tf: $("#selDataset option:selected").text()

    }, function (data) {
        //chart functions
        console.log(data.newinfo)
    })

});

function buildplots() {
    d3.json("/data").then((data) => {

        var developer = data.map(row=>row.developer);
        console.log(developer)
        var number_of_games = data.map(row=>row.number_of_games);
        console.log(number_of_games)

        var total_number_of_raters = data.map(row=>row.total_number_of_raters);
        console.log(total_number_of_raters)
        var avg_user_rating = data.map(row=>row.avg_user_rating);
        console.log(avg_user_rating)
        var price_point_app = data.map(row=>row.price_point_app);
        console.log(price_point_app)

        var countTrace =
        {
            x: number_of_games.slice(0, 10).reverse(), //count of games
            y: developer.slice(0, 10).map(value => `developer ${value}`).reverse(), //developers
            type: "bar",
            text: developer.slice(0, 10).reverse(), //count of games?developers?
            orientation: "h"
        };
        var countData = [countTrace];
        var countLayout =
        {
            title: "Count of Games by Developer", //Count of Games by Developer
            xaxis: { title: "# of Games" }, //# of Games
        };
        Plotly.newPlot("bar", countData, countLayout);


    
        var usersTrace = 
        {
          x: total_number_of_raters.slice(0,10).reverse(), //count of users per game by developer
          y: developer.slice(0,10).map(value=>`developer ${value}`).reverse(), //developers
          type: "bar",
          text: developer.slice(0,10).reverse(), //count of games?developers?
          orientation: "h"
        };
        var usersData = [usersTrace];
        var usersLayout = 
        {
          title: "Avg Number of Users per Game by Developer",
          xaxis: { title: "Avg Number of Users Per Game"},
        };
        Plotly.newPlot("bar2", usersData, usersLayout);



        var ratingTrace = 
        {
          x: avg_user_rating.slice(0,10).reverse(), //ratings
          y: developer.slice(0,10).map(value=>`Developer ${value}`).reverse(), //developers
          type: "bar",
          text: developer.slice(0,10).reverse(), //ratings?developers?
          orientation: "h"
        };
        var ratingData = [ratingTrace];
        var ratingLayout = 
        {
          title: "Avg Rating by Developer", //Avg Rating by Developer
          xaxis: { title: "Avg Rating by Developer "}, //Avg Rating
        };
        Plotly.newPlot("bar3", ratingData, ratingLayout);


    });
};


    buildplots();

