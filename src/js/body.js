yepnope.injectJs('public/google-analytics.js');

var isSmall = $(window).width() < 780;
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
lies.find("a[href='#agenda']").click(function() {
    goToId('agenda');
});
lies.find("a[href='#sponsor-us']").click(function() {
    goToId('sponsor-us');
});
lies.find("a[href='#organizers']").click(function() {
    goToId('organizers');
});

//END NAV BAR SCROLLING

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

/**CAROUSEL for partners and media*/
$('.slick-carousel-run').slick({
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    useCSS: true,
    responsive: [
        {
            breakpoint: 780,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
    ]
});
/**END CAROUSEL for partners and media*/

//TUTORS MODAL WINDOW
$(document).foundation();

$(document).on('opened.fndtn.reveal', '[data-reveal]', function () {
    var width = this.offsetWidth;
    if(width > 720){ //resize if large
        this.style.width = "720px";
    }
});
//END TUTORS MODAL WINDOW

