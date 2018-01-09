var List = document.getElementById("LoggingList");
var positionId = 0;
var listElements = [];

function InsertListElement(lat, lon) {

    if (listElements.length > 4) {
        listElements[0].remove();
        listElements.shift();
    }

    positionId++;
    var li = document.createElement("li");
    List.insertBefore(li, List.childNodes[0]);
    li.innerHTML = "Position "+ positionId +" Sucessfully Uploaded <br>Lat: " + lat + " <br> Lon:" + lon;
    listElements.push(li);
}