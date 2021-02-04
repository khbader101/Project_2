


$("select").change(function () {
    var tf = $("#selDataset option:selected").text();
    $.getJSON($SCRIPT_ROOT + "/data", {
        tf: $("#selDataset option:selected").text()

    }, function (data) {
        //chart functions
        console.log(data.newinfo)
    })

});

let url = '/data'
let xl = []
let yl = []
Plotly.d3.json(url, function(figure){
let data2 = figure.data
for (var i=0; i< data2.length; i++){
xl.push(data2[i].developer)
yl.push(data2[i].number_of_games) }
let trace = {
x: xl,
y: yl }
Plotly.plot(document.getElementById('bar'), [trace]); })    