// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

document.addEventListener("deviceready", onDeviceReady.bind(this), false);

var UserId;
var currentTripId = "";

var pageHistory = ["LoginPage"];
var thisPage;
var currentlyTracking = false;

function onDeviceReady() {

    if (UserId != null) {
        thisPage = document.getElementById("HomePage");
    } else {
        thisPage = document.getElementById("LoginPage");
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

document.getElementById("registerSubmitButton").addEventListener("click",
    function() {
        var firstName = document.getElementById("FirstNameInput").value;
        var lastName = document.getElementById("LastNameInput").value;
        var email = document.getElementById("Email").value;
        newUser(firstName, lastName, email);
    });

function newUser(firstname, lastname, email) {
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            var response = xhttp.responseText;
            UserId = response;
            nextPage("HomePage");
        }
    };
    xhttp.open("GET",
        "http://localhost:53869/api/User?FirstName=" + firstname + "&LastName=" + lastname + "&Email=" + email,
        true);
    xhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
    xhttp.send();
}

//Background mode handlers:
/*
window.BackgroundService.start(
    function (fn) { dosometing(), fn && fn() },
    function () { console.log('err') }
)
*/