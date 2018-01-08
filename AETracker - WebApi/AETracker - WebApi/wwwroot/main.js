var map;
var centerLat = 59.0511580941747;
var centerLng = 10.0217173435876;

var tripId = "";
var userId = "";

var loginButton = document.getElementById("loginButton").addEventListener("click",
    function() {
        userId = document.getElementById("LoginID").value;
        GetTripHistory();
    });

function initMap() {
    map = new google.maps.Map(document.getElementById("map"),
        {
            zoom: 15,
            center: { lat: centerLat, lng: centerLng },
            mapTypeId: "terrain",
            scrollWheelZoom: "center"
        });
}

function updateMap(responsePositions) {
    var positions = [];
    for (var i = 0; i < responsePositions.length; i++) {
        positions.push({ lat: parseFloat(responsePositions[i].lat), lng: parseFloat(responsePositions[i].lon) });
    }

    var flightPlanCoordinates = positions;

    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    flightPath.setMap(map);
}

function GetSingleTrip() {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var tripResponse = JSON.parse(xhttp.responseText);
            var responsePositions = tripResponse.positions;
            updateMap(responsePositions);
        }
    };
    xhttp.open("GET", "http://localhost:53869/api/SingleTrip?tripId=" + tripId + "&userId=" + userId, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}

function GetTripHistory() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(xhttp.responseText);
            insertTrips(response);
        }
    };
    xhttp.open("GET", "http://localhost:53869/api/History?userId=" + userId, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}

function insertTrips(response) {
    var table = document.getElementById("HighScoresTable");
    for (var i = 0; i < response.trips.length; i++) {
        var row = table.insertRow(-1);

        (function(i) {
            var id = response.trips[i].tripId;
            var lat = response.trips[i].positions[0].lat;
            var lon = response.trips[i].positions[0].lon;

            row.addEventListener("click",
                function() {
                    tripId = id;
                    centerLat = lat;
                    centerLng = lon;
                    initMap();
                    GetSingleTrip();
                });
        })(i);

        var tripIdCell = row.insertCell(0);
        var timestampCell = row.insertCell(1);
        tripIdCell.innerHTML = "Trip: " + (i + 1);
        timestampCell.innerHTML = "placeholder";
    }
}