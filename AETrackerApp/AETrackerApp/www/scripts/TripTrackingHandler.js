function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

document.getElementById("toggleTracker").addEventListener("click",
    function () {
        if (currentlyTracking === false) {
            currentlyTracking = true;
            currentTripId = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            tripHandler();
            document.getElementById("toggleTracker").innerHTML = "Stop";
        } else {
            currentlyTracking = false;
            document.getElementById("toggleTracker").innerHTML = "start";
        }
    });

function tripHandler() {

    setInterval(function () {
            if (currentlyTracking === true) {
                navigator.geolocation.getCurrentPosition(UploadToDb, onError);
            }
        },
        2000);
}

//Upload Coordinates to DB
function UploadToDb(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            /*
            document.getElementById("Position").innerHTML = JSON.parse(xhttp.responseText);
            */
            InsertListElement(lat, lon);
        }
    };
    xhttp.open("GET",
        "http://localhost:53869/api/Trip?Lat=" + lat + "&Lon=" + lon + "&UserId=" + UserId + "&TripId=" + currentTripId,
        true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}

function onError(error) {
    /*
    document.getElementById("Position").innerHTML =
        "code: " + error.code + "\n" + "message: " + error.message + "\n";
    */
}
