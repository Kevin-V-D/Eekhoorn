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