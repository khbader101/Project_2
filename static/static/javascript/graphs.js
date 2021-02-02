$.ajax({
    url: "/game",
    success: function (data) {
        var fixed = $("#selDataset");
        for (var i=0; i<data.length; i++) {
            console.log(`${data[i].primary_genre}`);
            fixed.append('option').text(data[i].primary_genre);
            if (i<10) break;
        };
        //Object.entries(string).forEach(([i, j]) => {
            //fixed.append('option').text(j);
        //});
}});
