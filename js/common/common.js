/*
===============================================
Common Js. Header, Navigation, Menu Etc.
===============================================
*/


/* Navigation get position */
var get_location = (function () {

    var nav_flag = document.getElementById("navigation_num").value;
    document.getElementById('nav_' + nav_flag).setAttribute("class", "selected");

    /* If location is 0 (home), set itself class, href. If not, change all of nav location for right directory */
    if(nav_flag == 0) {

        document.getElementById('nav_' + nav_flag).setAttribute("href", "index.html");

    } else {

        var long = document.getElementsByClassName("nav_a").length;

        for(var i = 1; i <= long; i++) {
            document.getElementById('nav_' + i).setAttribute("href", "page_" + i + ".html");
        }

        document.getElementById("nav_mid_2").setAttribute("href", "page_2.html");
        document.getElementById("nav_mid_7").setAttribute("href", "page_7.html");

    }

})();


/* When Hamburger Menu Click, Use it For slide menu, video. (Module pattern) */
var slide_menu = (function () {
    var menu_flag = 0,

        menu_click = function () {
            console.log("menu!");
            if(menu_flag === 0) {
                document.getElementById("header").setAttribute("style", "left: -250px");
                document.getElementById("navigation_wrap").setAttribute("style", "right: 0px");
                document.getElementById("main_role").setAttribute("style", "left: -250px");
                menu_flag = 1;
            } else {
                document.getElementById("header").setAttribute("style", "left: 0");
                document.getElementById("navigation_wrap").setAttribute("style", "right: -250px");
                document.getElementById("main_role").setAttribute("style", "left: 0");
                menu_flag = 0;
            }
        },

        cover_click = function () {
            console.log("cover!")
            if (menu_flag === 1) {
                document.getElementById("header").setAttribute("style", "left: 0");
                document.getElementById("main_role").setAttribute("style", "left: 0");
                document.getElementById("navigation_wrap").setAttribute("style", "right: -250px");
                menu_flag = 0;
            }
        };

    return {
        click_menu: menu_click,
        click_cover: cover_click
    }
})();

/* When Click Hamburger menu */
document.getElementById("button_menu").addEventListener("click", function() {
    /* Unable Event Bubbling */
    event.stopPropagation();
    slide_menu.click_menu();
});

/* When click Video Area when opened slide menu */
document.getElementById("main_role").addEventListener("click", slide_menu.click_cover);

/* Small close button in navigation wrap */
document.getElementById("menu_close").addEventListener("click", slide_menu.click_cover);





