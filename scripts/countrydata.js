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
            description: "Total confirmed cases: " + countries[i].totalConfirmedCases + "<br>Total deaths: " + countries[i].totalDeaths + "<br>Total recovered: " + countries[i].totalRecoveredCases,
            color: "#88A4BC",
            hover_color: "default",
            url: "#" + isoCode
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
    console.log(data);
    
    var chartDataConfirmed = [];

    var history = data.stats.history;

    for (var i=0; i<history.length; i++) {
        console.log(history[i]);
        var point = [new Date(history[i].date).getTime(), history[i].confirmed];
        chartDataConfirmed.push(point);
    }

    $.plot("#country-chart", [chartDataConfirmed], {
				xaxis: {
					mode: "time",
                    //timeformat: "%y-%m-%dT%H:%M:%S",
                    timeBase: "milliseconds",
					//autoScale: "none"
				}
            });
            
})
.fail(function () {
    alert("error");
});
}