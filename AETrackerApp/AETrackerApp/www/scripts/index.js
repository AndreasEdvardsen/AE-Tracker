// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.

    "use strict";
    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    var pageHistory = ['LoginPage'];
    var thisPage = document.getElementById('LoginPage');

    /*
     document.getElementById('button').addEventListener('click',
         function() {
 
             navigator.geolocation.getCurrentPosition(onSuccess, onError);
 
         });
     */
    function onDeviceReady() {

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };
    /*
    var onSuccess = function(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                document.getElementById("Position").innerHTML = JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("GET", "http://localhost:53869/api/Trip?UserId=poijdhwjephoiewrjh&Lat=" + lat + "&Lon=" + lon, true);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.send();
    };

    function onError(error) {
        document.getElementById('Position').innerHTML =
            'code: ' + error.code + '\n' + 'message: ' + error.message + '\n';
    }
    */

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