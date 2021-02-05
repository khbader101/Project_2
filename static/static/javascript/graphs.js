


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
    d3.csv("pandas.csv").then((data) => {

        //console.log(data);
        //var data2 = data.data2;
       // var results = data2.filter(s=>s.price_point_app == sampleData);
        //var graphData = results[0];
       // console.log(graphData);

        var price_point_app = data.price_point_app
        console.log(price_point_app)
        var number_of_games = data.number_of_games
        console.log(number_of_games)

        var countTrace =
        {
            x: number_of_games.slice(0, 10).reverse(), //count of games
            y: price_point_app.slice(0, 10).map(value => `developer ${value}`).reverse(), //developers
            type: "bar",
            text: price_point_app.slice(0, 10).reverse(), //count of games?developers?
            orientation: "h"
        };
        var countData = [countTrace];
        var countLayout =
        {
            title: "Count of Games by Developer", //Count of Games by Developer
            xaxis: { title: "# of Games" }, //# of Games
        };
        Plotly.newPlot("bar", countData, countLayout);

    });
};


    buildplots();

