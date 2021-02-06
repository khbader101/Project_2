


//$("select").change(function () {
  //  var tf = $("#selDataset option:selected").text();
    //$.getJSON($SCRIPT_ROOT + "/data", {
      //  tf: $("#selDataset option:selected").text()

    //}, function (data) {
        //chart functions
      //  console.log(data.newinfo)
    //})

//});





$.ajax({
    url: "/data",
    success: function (data) {
        console.log(data);
        $("#selDataset").change(function (event) {
            console.log(event);
            console.log(event.target);
            console.log(event.target.value);
            console.log($( this ).val());
            var price_point_app = this.value;
            console.log(price_point_app);
            if (price_point_app == "Free") {
                $.grep([data], function (n,i) {
                    return n.price_point_app === 'Free';
                });
            }
        });
    }
 });


function buildplots() {
    d3.json("/data").then((data) => {

        var developer = data.map(row=>row.developer);
        console.log(developer)
        var primary_genre = data.map(row=>row.primary_genre);
        console.log(primary_genre)
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


    buildplots();

