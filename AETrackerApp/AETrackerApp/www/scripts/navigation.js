document.addEventListener('deviceready', onDeviceReady.bind(this), false);

function onDeviceReady() {

    document.addEventListener("backbutton",
        function() {
            lastPage();
        });

    //Navigation to pages:
    document.getElementById('registerButton').addEventListener("click",
        function() {
            nextPage('NewUserPage');
        });

    document.getElementById('newTripButton').addEventListener("click",
        function () {
            nextPage('NewTripPage');
        });

};