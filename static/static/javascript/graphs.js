


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
    d3.json('/game').then((data) => {

        console.log(data);
        var data2 = data.data2;
        var results = data2.filter(s=>s.price_point_app == sampleData);
        var  graphData = results[0];
        console.log(graphData);

        var developers = graphData.developers
        var number_of_games = graphData.number_of_games

        var countTrace =
        {
            x: number_of_games.slice(0, 10).reverse(), //count of games
            y: developers.slice(0, 10).map(value => `developer ${value}`).reverse(), //developers
            type: "bar",
            text: developers.slice(0, 10).reverse(), //count of games?developers?
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

