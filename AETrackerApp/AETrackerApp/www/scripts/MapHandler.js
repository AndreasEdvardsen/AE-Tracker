var map;
var centerLat = 59.0511580941747;
var centerLng = 10.0217173435876;

var tripId = "";

function initMap() {
    map = new google.maps.Map(document.getElementById("map"),
        {
            zoom: 15,
            center: { lat: centerLat, lng: centerLng },
            mapTypeId: "terrain",
            scrollWheelZoom: "center",
            disableDefaultUI: true
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

function GetTripHistory() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = JSON.parse(xhttp.responseText);
            insertTrips(response);
        }
    };
    xhttp.open("GET", "http://localhost:53869/api/History?userId=" + UserId, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}

function insertTrips(response) {

    var trips = [];
    for (var j = 0; j < response.trips.length; j++) {
        var t = response.trips[j];
        trips.push({ tripId: t.tripId, lat: parseFloat(t.positions[0].lat), lon: parseFloat(t.positions[0].lon) });
    }

    var List = document.getElementById("tripList");

    var counter = 0;
    for (var i = trips.length - 1; i >= 0; i--) {
        if (counter > 10) break;
        var li = document.createElement("li");
        (function(i) {
            var id = trips[i].tripId;
            var lat = trips[i].lat;
            var lon = trips[i].lon;

            li.addEventListener("click",
                function() {
                    tripId = id;
                    centerLat = lat;
                    centerLng = lon;
                    initMap();
                    GetSingleTrip();
                });
        })(i);

        List.appendChild(li);
        li.innerHTML = "Trip: " + (counter + 1);
        counter++;
    }
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
    xhttp.open("GET", "http://localhost:53869/api/SingleTrip?tripId=" + tripId + "&userId=" + UserId, true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}