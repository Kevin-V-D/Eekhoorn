const btn = document.querySelector(".logIn");
const form = document.querySelector("form");
const Username = document.querySelector("#Username");
const Password = document.querySelector("#Password");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
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
        form.style.display = "none";
    } else {
        const p = document.createElement("p");
        p.innerText = data.bericht;
        form.prepend(p);
    }
});