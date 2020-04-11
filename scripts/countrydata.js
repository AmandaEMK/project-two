$.ajax({
    type: "GET",
    url: "https://api.smartable.ai/coronavirus/stats/global",

    // Request headers
    beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("Cache-Control", "no-cache");
        xhrObj.setRequestHeader("Subscription-Key", "d00c7834e9704372bad71fff4f715467");
        },
    })

.done(data => {
    let countries = data.stats.breakdowns;

    for (let i=0; i<countries.length; i++) {
        let countryName = countries[i].location.countryOrRegion;
        let isoCode = countries[i].location.isoCode;
        let country = { 
            name: countryName,
            description:`Confirmed cases: ${countries[i].totalConfirmedCases}<br>Deaths: ${countries[i].totalDeaths}<br>Recovered: ${countries[i].totalRecoveredCases}`,
            color: "#88A4BC",
            hover_color: "default",
            url: ""
        };
        
        // Fix known broken countries
        if (isoCode) {
            mapCountryList[isoCode.toUpperCase()] = country;
        } 
        
    }
    simplemaps_worldmap_mapdata.state_specific = mapCountryList;
    simplemaps_worldmap.hooks.click_state = function(id){
        loadCountryData(id);
    }
    simplemaps_worldmap.load();

})

function loadCountryData(id) {
    $.ajax({
    type: "GET",
    url: "https://api.smartable.ai/coronavirus/stats/" + id,

    // Request headers
    beforeSend: function(xhrObj) {
        xhrObj.setRequestHeader("Cache-Control", "no-cache");
        xhrObj.setRequestHeader("Subscription-Key", "d00c7834e9704372bad71fff4f715467");
        },
    })

.done(data => {
    
    let chartDataConfirmed = [];
    let chartDataDeaths = [];
    let chartDataRecovered = [];

    let history = data.stats.history;

    let firstDay;

    for (let i=0; i<history.length; i++) {
        
        let pointConfirmed = [new Date(history[i].date).getTime(), history[i].confirmed];
        chartDataConfirmed.push(pointConfirmed);
        if (history[i].deaths > 0) {
            let pointDeaths = [new Date(history[i].date).getTime(), history[i].deaths];
            chartDataDeaths.push(pointDeaths);
        }
        
        if (history[i].recovered > 0) {
            let pointRecovered = [new Date(history[i].date).getTime(), history[i].recovered];
            chartDataRecovered.push(pointRecovered);
        }

        if (!firstDay && history[i].confirmed>0) {
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
                    timeBase: "milliseconds",
                    min: firstDay
                },
                yaxis: [
                    {min:0}, {min:0}, {min:0}
                ],
                legend: {position:"nw"}
            });
            
})
}

// Fix chart "disappearing" when on mobile
window.addEventListener("resize", function(){
    let height = $("#country-chart").height();
    $(".chart-container").height(height);
});