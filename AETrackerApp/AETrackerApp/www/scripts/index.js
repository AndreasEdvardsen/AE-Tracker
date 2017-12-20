// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in cordova-simulate or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function() {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    document.getElementById('button').addEventListener('click',
        function() {

            navigator.geolocation.getCurrentPosition(onSuccess, onError);

        });

    function onDeviceReady() {

    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    var onSuccess = function(position) {
        var lat = position.latitude;
        var lon = position.longitude;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                document.getElementById("Position").innerHTML = JSON.parse(xhttp.responseText);
            }
        };
        xhttp.open("GET", "http://aeleaderboards.azurewebsites.net/api/NewUser?Username=" + Username + "&SecurityCode=" + SecurityCode, true);
        xhttp.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhttp.send();
    };

    function onError(error) {
        document.getElementById('Position').innerHTML =
            'code: ' + error.code + '\n' + 'message: ' + error.message + '\n';
    }
})();