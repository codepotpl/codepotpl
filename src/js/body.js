yepnope.injectJs('public/google-analytics.js');

//GOOGLE MAP
var map;
function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        center: new google.maps.LatLng(52.2482095, 21.0650699),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(52.2482095, 21.0650699),
        map: map,
        title:"CODEPOT will be here!"
    });
}

google.maps.event.addDomListener(window, 'load', initialize);
document.getElementById("show_map").onclick = function(){
    document.getElementById("map").style.display = 'inline';
    //$('section#map').show();
    currentCenter = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(currentCenter);
}
//END GOOGLE MAP