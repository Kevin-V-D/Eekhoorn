const menu = document.querySelector(".menu-toggle");
const navBar = document.querySelector("#navButtons");

menu.addEventListener("click", () => {
    navBar.classList.toggle("active");
});

console.log(menu, navBar);