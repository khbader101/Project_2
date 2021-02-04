


$("select").change(function () {
    var tf = $("#selDataset option:selected").text();
    $.getJSON($SCRIPT_ROOT + "/data", {
        tf: $("#selDataset option:selected").text()

    }, function (data) {
        //chart functions
        console.log(data.newinfo)
    })

});

function buildplots(sampleData) {
    d3.json('/data').then((dataset) => {

        console.log(dataset)

        var countTrace =
        {
            x: data["number_of_games"].slice(0, 10).reverse(), //count of games
            y: data["developer"].slice(0, 10).map(value => `developer ${value}`).reverse(), //developers
            type: "bar",
            text: data["developer"].slice(0, 10).reverse(), //count of games?developers?
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
