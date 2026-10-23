const btn = document.querySelector(".logIn");
const form = document.querySelector("form");
const Username = document.querySelector("#Username");
const Password = document.querySelector("#Password");
const naam = "ingrid";
const wachtwoord = "maxverstappen";

if (localStorage.getItem("wrong") === "true") {
    const p = document.createElement("p");
    p.innerText = "Wachtwoord is incorrect.";
    form.insertAdjacentElement("beforebegin", p);
    localStorage.setItem("wrong", "false");
}

if (localStorage.getItem("isLoggedIn") === "true") {
    form.style.display = "none";
}

form.addEventListener("submit", (e) => {
    if (Username.value === naam && Password.value === wachtwoord) {
        localStorage.setItem("wrong", "false");
        localStorage.setItem("isLoggedIn", "true");
    } else {
        localStorage.setItem("wrong", "true");
    }
});
