yepnope.injectJs('public/google-analytics.js');

var isSmall = $(window).width() < 820 ? true : false;
/**GOOGLE MAP*/
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
/**END GOOGLE MAP*/
$(document).foundation('topbar', 'reflow');

/**NAV BAR SCROLLING*/
var lies = $("nav li.name");

lies.find("a[href='#about']").click(function() {
    goToId('about');
});
lies.find("a[href='#venue']").click(function() {
    goToId('venue');
});
lies.find("a[href='#tutors']").click(function() {
    goToId('tutors');
});
lies.find("a[href='#sponsor-us']").click(function() {
    goToId('sponsor-us');
});
lies.find("a[href='#organizers']").click(function() {
    goToId('organizers');
});

function goToId(id){
    var speed = 500; //ms
    var where = $("#" + id).offset().top;
    var padding = $("nav.top-bar").height();
    var presentYPosition = $(window).scrollTop();
    if(isSmall) {
        $('html, body').animate({
            scrollTop: where - padding
        }, speed);
    } else {
        var destination = where;
        if(where > presentYPosition){
            destination = where; //when we scroll down, nav bar is hided
        } else {
            destination = where - padding;
        }
        $('html, body').animate({
            scrollTop: destination
        }, speed);
    }
}
/**END NAV BAR SCROLLING*/

/**START HIDE/SHOW NAV BAR ON SCROLL*/
var didScroll;
var didMoveUp;
var lastScrollTop = 0;
var lastYMousePosition = 0;
var delta = 5;
var navbarHeight = $('div#navbar.fixed').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});
$(window).mousemove(function( event ) {
    var presentYMousePosition = event.pageY;
    if(lastYMousePosition > presentYMousePosition){ //50 delay
        didMoveUp = true;
    }
    lastYMousePosition = presentYMousePosition;
});

setInterval(function() {
    if ((didScroll || didMoveUp) && !isSmall) {
        hasScrolled();
        didScroll = false;
        didMoveUp = false;
    }
}, 100);

function hasScrolled() {
    var st = $(this).scrollTop();
    if(Math.abs(lastScrollTop - st) <= delta && !didMoveUp)
        return;
    if (st > lastScrollTop && st > navbarHeight){
        $('div#navbar.fixed').removeClass('nav-down').addClass('nav-up-hide');
    } else {
        if(st + $(window).height() < $(document).height() || didMoveUp) {
            $('div#navbar.fixed').removeClass('nav-up-hide').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}
/**END HIDE/SHOW NAV BAR ON SCROLL*/