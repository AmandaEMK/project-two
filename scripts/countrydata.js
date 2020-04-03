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
        var country = {
            name: countryName,
            description: "Total confirmed cases: " + countries[i].totalConfirmedCases + "<br>Total deaths: " + countries[i].totalDeaths + "<br>Total recovered: " + countries[i].totalRecoveredCases,
            color: "#88A4BC",
            hover_color: "default"
        };
        var isoCode = countries[i].location.isoCode;

        // Fix known broken countries
        if (isoCode != null) {
            mapCountryList[isoCode.toUpperCase()] = country;
        } else {
            console.log("No iso code for country " + countryName);
        }
        
    }
    simplemaps_worldmap_mapdata.state_specific = mapCountryList;
    simplemaps_worldmap.load();

})
.fail(function () {
    alert("Error: Data could not be loaded");
});