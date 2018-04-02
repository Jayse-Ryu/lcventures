/*
===============================================
Common Js. Header, Navigation, Menu Etc.
===============================================
*/

/* When Hamburger Menu Click, Use it For slide menu, video. (Module pattern) */
var slide_menu = (function () {
    var menu_flag = 0,

        menu_click = function () {
            console.log("menu");
            if(menu_flag == 0) {
                document.getElementById("header").setAttribute("style", "left: -250px");
                document.getElementById("navigation_wrap").setAttribute("style", "right: 0px");
                document.getElementById("main").setAttribute("style", "left: -250px");

                menu_flag = 1;
                console.log("menu_done");
            } else {
                document.getElementById("header").setAttribute("style", "left: 0");
                document.getElementById("navigation_wrap").setAttribute("style", "right: -250px");
                document.getElementById("main").setAttribute("style", "left: 0");
                menu_flag = 0;
                console.log("menu_done");
            }
        },

        cover_click = function () {
            console.log("cover");
            if (menu_flag == 1) {
                document.getElementById("header").setAttribute("style", "left: 0");
                document.getElementById("main").setAttribute("style", "left: 0");
                document.getElementById("navigation_wrap").setAttribute("style", "right: -250px");
                menu_flag = 0;
                console.log("cover_done");
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
document.getElementById("main").addEventListener("click", slide_menu.click_cover);

