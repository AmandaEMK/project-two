$.ajax({
    type: "GET",
    url: "https://api.smartable.ai/coronavirus/stats/global",

    // Request headers
    beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("Cache-Control", "no-cache");
        xhrObj.setRequestHeader("Subscription-Key", "d00c7834e9704372bad71fff4f715467");
        },
    })

.done(function (data) {
    console.log(data);
    var countries = data.stats.breakdowns;
    console.log(countries);

    for (var i=0; i<countries.length; i++) {
        console.log(countries[i]);
        var countryName = countries[i].location.countryOrRegion;
        var isoCode = countries[i].location.isoCode;
        var country = {
            name: countryName,
            description: "Confirmed cases: " + countries[i].totalConfirmedCases + "<br>Deaths: " + countries[i].totalDeaths + "<br>Recovered: " + countries[i].totalRecoveredCases,
            color: "#88A4BC",
            hover_color: "default",
            url: ""
        };
        

        // Fix known broken countries
        if (isoCode != null) {
            mapCountryList[isoCode.toUpperCase()] = country;
        } else {
            console.log("No iso code for country " + countryName);
        }
        
    }
    simplemaps_worldmap_mapdata.state_specific = mapCountryList;
    simplemaps_worldmap.hooks.click_state = function(id){
        loadCountryData(id);
    }
    simplemaps_worldmap.load();

})
.fail(function () {
    alert("Error: Data could not be loaded");
});

function loadCountryData(id) {
    console.log(id);

    $.ajax({
    type: "GET",
    url: "https://api.smartable.ai/coronavirus/stats/" + id,

    // Request headers
    beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("Cache-Control", "no-cache");
        xhrObj.setRequestHeader("Subscription-Key", "d00c7834e9704372bad71fff4f715467");
        },
    })
.done(function (data) {
    
    
    var chartDataConfirmed = [];
    var chartDataDeaths = [];
    var chartDataRecovered = [];

    var history = data.stats.history;

    var firstDay = null;

    for (var i=0; i<history.length; i++) {
        
        var pointConfirmed = [new Date(history[i].date).getTime(), history[i].confirmed];
        chartDataConfirmed.push(pointConfirmed);
        if (history[i].deaths > 0) {
            var pointDeaths = [new Date(history[i].date).getTime(), history[i].deaths];
            chartDataDeaths.push(pointDeaths);
        }
        
        if (history[i].recovered > 0) {
            var pointRecovered = [new Date(history[i].date).getTime(), history[i].recovered];
            chartDataRecovered.push(pointRecovered);
        }

        if (firstDay == null && history[i].confirmed>0) {
            firstDay = new Date(history[i].date).getTime();
        }
    }

    $.plot("#country-chart", [
        {
            data: chartDataConfirmed, label: "Confirmed cases"
        },
        {
            data: chartDataDeaths, label: "Deaths"
        },
        {
            data: chartDataRecovered, label: "Recovered"
        }
    ], {
				xaxis: {
					mode: "time",
                    //timeformat: "%y-%m-%dT%H:%M:%S",
                    timeBase: "milliseconds",
                    //autoScale: "none"
                    min: firstDay
                },
                yaxis: [
                    {min:0}, {min:0}, {min:0}
                ],
                legend: {position:"nw"}
            });
            
})
.fail(function () {
    alert("Error");
});
}

// Fix chart "dissappearing" when on mobile
window.addEventListener("resize", function(){
    var height = $("#country-chart").height();
    $(".chart-container").height(height);
});