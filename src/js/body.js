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
lies.find("a[href='#workshops']").click(function() {
    goToId('workshops');
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

/**WORKSHOP TAG BUTTONS*/
function startTagButtonWorkshops() {
    function getUrlParametersTagSelected() {
        var urlParameters = window.location.search.replace('?', '');
        urlParameters = urlParameters.split('&');
        var parameters = [];
        for (var key in urlParameters) {
            var str = urlParameters[key];
            var tagSelected = str.substring(str.length - str.lastIndexOf("tagSelected=") + 12,
                str.lastIndexOf("tagSelected=") + 12);
            if (tagSelected.length > 0 && tagSelected.lastIndexOf("tagSelected=") == -1)
                parameters.push(tagSelected);
        }
        return parameters;
    }

    function reloadUrlParametersTagSelected(parametersArg) {
        var urlParameters = window.location.search.replace('?', '');
        urlParameters = urlParameters.split('&');
        var parameters = [];
        for (var key in urlParameters) {
            var str = urlParameters[key];
            var tagSelected = str.substring(str.length - str.lastIndexOf("tagSelected=") + 12,
                str.lastIndexOf("tagSelected=") + 12);
            if (tagSelected.length > 0 && str.lastIndexOf("tagSelected=") >= 0)
                delete urlParameters[key];
            else
                parameters.push(str);
        }
        for (var index in parameters) {
            parameters.push('tagSelected=' + parametersArg[index]);
        }
        var ret = "?#";
        for (var index in parameters) {
            ret += "&" + parameters[index];
        }
        ret.replace("?#&", "?#"); //first symbol
        window.location.search = ret;
    }

    function tagButtons(defaultSelectedTags) {
        $("#workshops .tagButtons .tags-select").show();
        var workshops = $("#workshops .workshop-row");
        var uniqueTags = {};
        $.each(workshops, function (key, workshop) {
            var tags = $(workshop).find("div.tags span");
            $.each(tags, function (key, tag) {
                tag = $(tag).text();
                var howMany = uniqueTags[tag];
                if (!howMany) {
                    howMany = 0;
                }
                howMany++;
                uniqueTags[tag] = howMany;
            });
        });
        var tagButtons = $("#workshops .tagButtons .tags-select");
        //sort key by name
        var keys = [];
        for (var key in uniqueTags) {
            keys.push(key);
        }
        keys.sort(function (a, b) {
            if (a.toLowerCase() < b.toLowerCase()) return -1;
            if (a.toLowerCase() > b.toLowerCase()) return 1;
            return 0;
        });

        jQuery('<option/>', {
            value: 'All',
            text: 'All' + ' (' + workshops.length + ')',
            selected: !defaultSelectedTags
        }).appendTo(tagButtons);
        $.each(keys, function (index, key) {
            jQuery('<option/>', {
                value: key,
                text: key + ' (' + uniqueTags[key] + ')',
                selected: (defaultSelectedTags.indexOf(key) != -1) ? true : false
            }).appendTo(tagButtons);
        });
    }

    var lastSelectedTags = [];
    lastSelectedTags.push('All');

    $("#workshops .tagButtons .tags-select").select2({
        placeholder: "Find by tag"
    }).on("change", function () {
        // mostly used event, fired to the original element when the value changes
        var tagsSelected = $(this).val();
        if (tagsSelected && tagsSelected.indexOf('All') >= 0 && tagsSelected.length > 1 && lastSelectedTags.indexOf('All') >= 0) {
            delete tagsSelected[tagsSelected.indexOf('All')];
            $(this).val(tagsSelected);
            lastSelectedTags = tagsSelected;
            $(this).trigger('change');
        }
        if (!tagsSelected || (lastSelectedTags && tagsSelected
            && lastSelectedTags.indexOf('All') == -1 && tagsSelected.indexOf('All') >= 0)) { //empty? select All
            $(this).val('All');
            lastSelectedTags = tagsSelected;
            $(this).select2().trigger('change');
        }
        tagsSelected = $(this).val();
        lastSelectedTags = tagsSelected;
        console.log("change val=" + tagsSelected);
        var workshops = $("#workshops .workshop-row");
        $.each(workshops, function (key, workshop) {
            var tags = $(workshop).find("div.tags span");
            var hideWorkshopRow = true;
            $.each(tags, function (key, tag) {
                tag = $(tag).text();
                if (!tagsSelected || tagsSelected.indexOf('All') >= 0 || tagsSelected.indexOf(tag) >= 0)
                    hideWorkshopRow = false;
            });
            if (hideWorkshopRow)
                $(workshop).closest('.workshop-row').hide();
            else
                $(workshop).closest('.workshop-row').show();
        });
        $("#workshops .tagButtons input.select2-search__field").attr("placeholder","Filtr by tags"); // set placeholder 
        //reloadUrlParametersTagSelected(tagsSelected);
    });

    var defaultSelectedTags = getUrlParametersTagSelected();
    tagButtons(defaultSelectedTags);//start, sets buttons
    $("#workshops .tagButtons .tags-select").trigger('change'); //sets default values
}
startTagButtonWorkshops();
/**END WORKSHOP TAG BUTTONS*/
