﻿// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

document.addEventListener('deviceready', onDeviceReady.bind(this), false);

var UserId = "68be74a7-d3d8-46f4-a028-f085ddc49f13";
var currentTripId = "";

var pageHistory = ['LoginPage'];
var thisPage = document.getElementById('LoginPage');
var currentlyTracking = false;

function onDeviceReady() {

    if (UserId != null) {
        thisPage = document.getElementById('HomePage');
    }

    toggleVisibility(thisPage);
};

function onPause() {
    // TODO: This application has been suspended. Save application state here.
};

function onResume() {
    // TODO: This application has been reactivated. Restore application state here.
};

function toggleVisibility(element) {
    if (element.style.display == "block") {
        element.style.display = "none";
    } else {
        element.style.display = "block";
    }
}

function nextPage(toPage) {
    var next = document.getElementById(toPage);

    toggleVisibility(thisPage);
    toggleVisibility(next);

    pageHistory.push(thisPage);
    thisPage = next;
}

function lastPage() {
    if (pageHistory.length > 1) {
        toggleVisibility(thisPage);
        toggleVisibility(pageHistory[pageHistory.length - 1]);

        thisPage = pageHistory[pageHistory.length - 1];
        pageHistory.pop();
    }
}

function login() {

}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

document.getElementById('toggleTracker').addEventListener('click',
    function() {
        if (currentlyTracking === false) {
            currentlyTracking = true;
            currentTripId = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
            tripHandler();
            document.getElementById('toggleTracker').innerHTML = "Stop";
        } else {
            currentlyTracking = false;
            document.getElementById('toggleTracker').innerHTML = "start";
        }
    });

function tripHandler(tripId) {

    setInterval(function() {
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

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById("Position").innerHTML = JSON.parse(xhttp.responseText);
        }
    };
    xhttp.open("GET",
        "http://localhost:53869/api/Trip?Lat=" + lat + "&Lon=" + lon + "&UserId=" + UserId + "&TripId=" + currentTripId, true);
    xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
    xhttp.send();
}

function onError(error) {
    document.getElementById('Position').innerHTML =
        'code: ' + error.code + '\n' + 'message: ' + error.message + '\n';
}

//Background mode handlers:
/*
window.BackgroundService.start(
    function (fn) { dosometing(), fn && fn() },
    function () { console.log('err') }
)
*/