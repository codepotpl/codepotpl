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
        draggable: false,
        center: new google.maps.LatLng(52.248421, 21.066009),
        zoom: 17,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(mapCanvas, mapOptions);
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(52.248421, 21.066009),
        map: map,
        title: "CODEPOT will be here!"
    });
}

document.getElementById("show_map").onclick = function () {
    yepnope.injectJs('https://maps.googleapis.com/maps/api/js?callback=initialize', function () {
        document.getElementById("map").style.display = 'inline';
        document.getElementById("show_map").style.display = 'none';
    });
};
//END GOOGLE MAP