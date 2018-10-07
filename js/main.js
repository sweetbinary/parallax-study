//plax study - sweet binary

var plax_elements = [];
var window_width;
var window_height;
var min_parallax_width = 1;//1025

var plax_enabled = true; //set to false to disable plax

function init_plax(){

    if (document.getElementById("ie9")) {
        plax_enabled = false;
    }

    if (plax_enabled == true) {

        $(window).resize(function () {
            fancy_resizeEL();
        });
        fancy_resizeEL();

        $(window).scroll(function () {
            fancy_scrollEL();
        });
    }
    else {
        $(".fancy-scroll").addClass("show");
    }
}


function fancy_resizeEL() {

    //getting the offset top of parallax elements every time the window is resized, a delay is added to avoid taking the offset top during the animation
    window_width = $(window).width();

    //only run if deskop
    if (window_width >= min_parallax_width) {

        plax_elements = [];
        setTimeout(function () {
            $(".fancy-scroll").each(function () {
                plax_elements.push({ div: $(this), scroll_top: Math.ceil($(this).offset().top) });
            });            
            fancy_scrollEL();
        }, 150);
    }
    else {
        fancy_scrollEL();
    }
}

function fancy_scrollEL() {
    var scroll_top = $(window).scrollTop();
    var window_height = $(window).height();
    //var scroll_percentage = Math.ceil((scroll_top / window_height) * 100);

    //parallax checking for everything else, only run if its on desktop
    if (window_width >= min_parallax_width) {    
        
        var tempVar = (scroll_top + window_height);        
        for (i = 0; i < plax_elements.length; i++) {

            if (tempVar > plax_elements[i].scroll_top) {
                if (plax_elements[i].div.hasClass("show") == false) {
                    plax_elements[i].div.addClass("show");
                }
            }
            else {
                if (plax_elements[i].div.hasClass("show") == true) {
                    plax_elements[i].div.removeClass("show");
                }
            }
        }

    }
}

//===========================================================================================plax stuff fullscreen

function init_plax_fs(){

    if (document.getElementById("ie9")) {
        plax_enabled = false;
    }

    if (plax_enabled == true) {

        $(window).resize(function () {
            fancy_resizeEL_fs();
        });
        fancy_resizeEL_fs();

        $(window).scroll(function () {
            fancy_scrollEL_fs();
        });
    }
    else {
        $(".fancy-scroll").addClass("show");
    }
}


function fancy_resizeEL_fs() {

    //getting the offset top of parallax elements every time the window is resized, a delay is added to avoid taking the offset top during the animation
    window_width = $(window).width();
    window_height= $(window).height();


    //only run if deskop
    if (window_width >= min_parallax_width) {

        plax_elements = [];
        setTimeout(function () {
            $(".fancy-scroll").each(function () {
                plax_elements.push({ div: $(this), imgz: $(this).children(".img").children("img") });
                $(this).height(window_height);
            });
            //alert(plax_elements[0].scroll_top);
            fancy_scrollEL_fs();
        }, 150);

    }
    else {
        fancy_scrollEL();
    }
}

function fancy_scrollEL_fs() {
    var scroll_top = $(window).scrollTop();
    var window_height = $(window).height();
    var scroll_percentage = Math.ceil((scroll_top / window_height) * 100);
    debugTrace2(scroll_percentage);

    //parallax checking for everything else, only run if its on desktop
    if (window_width >= min_parallax_width) {    
        
        var current_row = Math.floor(scroll_percentage/100);
        var tempVar = scroll_percentage - (current_row * 100);
        var tempVar2 = (tempVar - 100) * - 1;
        debugTrace2(current_row + "(" + scroll_percentage + "%)" + "(" + tempVar + "%)" + "["+ tempVar2 +"]");

        $(".plax-bg > div:nth-child(odd)").removeClass().addClass("plax-y"+Math.floor(tempVar/3.33));
        $(".plax-bg > div:nth-child(even)").removeClass().addClass("plax-y-"+Math.floor(tempVar/3.33));

        for (i = 0; i < plax_elements.length; i++) {
            if (i <= current_row)
            {
                //if you dont want negative translate use this
                //plax_elements[i].imgz.removeClass().addClass("plax-y0");

                //else if you want negative translate, use this.                
                tempVar3 = tempVar2-100;
                plax_elements[i].imgz.removeClass().addClass("plax-y"+tempVar3);
            }
            else if (i > (current_row + 1))
            {
                plax_elements[i].imgz.removeClass().addClass("plax-y100");
            }
            else {                
                plax_elements[i].imgz.removeClass().addClass("plax-y"+tempVar2);
            }
        }




    }
}
function debugTrace(str) {
    $("#debugger").prepend(str + "<br />");
}
function debugTrace2(str) {
    $("#debugger").text(str);
}
