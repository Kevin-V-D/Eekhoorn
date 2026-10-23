const uploadbtn = document.querySelector("#fileInput");

uploadbtn.addEventListener("change", (event) => {
    const chosenFile = event.target.files[0];

    if (chosenFile) {
        console.log("Gekozen bestand:", chosenFile.name);
        console.log("Bestandstype:", chosenFile.type);
        console.log("Grootte in bytes:", chosenFile.size);
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