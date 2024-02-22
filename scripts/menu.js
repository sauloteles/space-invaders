function play() {
    screen_menu = document.getElementById("menu")
    screen_canvas = document.getElementById("canvas")

    screen_canvas.className = screen_canvas.className.replace("disable", "activated")
    screen_menu.className = screen_menu.className.replace("activated", "disable")
}

function multiplayerMenu() {
    screen_main_menu = document.getElementById("main-menu")
    screen_multiplayer = document.getElementById("multiplayer-menu")

    screen_multiplayer.className = screen_multiplayer.className.replace("disable", "activated")
    screen_main_menu.className = screen_main_menu.className.replace("activated", "disable")
}

function back() {
    screen_main_menu = document.getElementById("main-menu")
    screen_multiplayer = document.getElementById("multiplayer-menu")

    screen_main_menu.className = screen_main_menu.className.replace("disable", "activated")
    screen_multiplayer.className = screen_multiplayer.className.replace("activated", "disable")
}