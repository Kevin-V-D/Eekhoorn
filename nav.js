const menu = document.querySelector(".menu-toggle");
const navBar = document.querySelector("#navButtons");
const logo = document.querySelector("#logo button");

menu.addEventListener("click", () => {
    navBar.classList.toggle("active");
});

const longPress = 500;
let pressTimer = null;

function startPress(e) {
    pressTimer = setTimeout(() => {
        e.preventDefault();
        console.log("long pressed");
        window.location.href = "login.html"
    }, longPress);
}

function cancelPress() {
    if (pressTimer !== null) {
        clearInterval(pressTimer);
        pressTimer = null;
        window.location.href = "upload.html";
    }
}

logo.addEventListener("mousedown", startPress);
logo.addEventListener("mouseup", cancelPress);
logo.addEventListener("mouseleave", cancelPress);

logo.addEventListener("touchstart", startPress);
logo.addEventListener("touchend", cancelPress);
logo.addEventListener("touchcancel", cancelPress);