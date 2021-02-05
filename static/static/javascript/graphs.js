


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

        var avg_user_rating = data.map(row=>row.avg_user_rating);
        console.log(avg_user_rating)
        var avg_user_rating_count = user_rating_count/number_of_games;
        console.log(avg_user_rating_count)

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



        avg_user_rating_count  = user_rating_count/number_of_games   

        var usersTrace = 
                {
                  x: avg_user_rating_count.slice(0,10).reverse(), //count of users per game by developer
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
                Plotly.newPlot("bar", usersData, usersLayout);

    });
};


    buildplots();

