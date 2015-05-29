yepnope.injectJs('public/google-analytics.js');

var map;
function initialize() {
    var mapCanvas = document.getElementById('map-canvas');
    var mapOptions = {
        scrollwheel: false,
        navigationControl: false,
        mapTypeControl: false,
        scaleControl: false,
        center: new google.maps.LatLng(52.248421,21.066009),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(52.248421, 21.066009),
        map: map,
        title:"CODEPOT will be here!"
    });
}
//GOOGLE MAP
google.maps.event.addDomListener(window, 'load', initialize);
document.getElementById("show_map").onclick = function(){
    document.getElementById("map").style.display = 'inline';
    document.getElementById("show_map").style.display = 'none';



    currentCenter = map.getCenter();
    google.maps.event.trigger(map, 'resize');
    map.setCenter(currentCenter);
}
//END GOOGLE MAP