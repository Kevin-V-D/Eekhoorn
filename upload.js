const uploadbtn = document.querySelector("#fileInput");

uploadbtn.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
        console.log("Gekozen bestand:", file.name);
        console.log("Bestandstype:", file.type);
        console.log("Grootte in bytes:", file.size);
    }
});

window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("./api/check-auth", {
        method: "GET"
    });

    const data = await response.json();

    if (!data.success) {
        window.location.href = "/index.html";
    } else {
        document.querySelector(".loading").style.display = "none";
    }
});