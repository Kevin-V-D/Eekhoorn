const btn = document.querySelector(".logIn");
const form = document.querySelector("form");
const Username = document.querySelector("#Username");
const Password = document.querySelector("#Password");
let foutmelding;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (foutmelding) {
        foutmelding.remove();
        foutmelding = null;
    }

    const response = await fetch("./api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: Username.value,
            password: Password.value
        })
    });

    const data = await response.json();

    if (data.success) {
        console.log("Inloggen is gelukt!");
        window.location.href = "/upload.html";
    } else {
        foutmelding = document.createElement("p");
        foutmelding.innerText = data.bericht;
        foutmelding.style.wordBreak = "break-word";
        form.prepend(foutmelding);
    }
});