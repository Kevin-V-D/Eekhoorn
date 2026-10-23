const main = document.querySelector("main");
const btn = document.querySelector(".upload");

btn.addEventListener("click", () => {
    const test = document.createElement("div");
    const img = document.createElement("img");
    test.style.height = "100px";
    img.src = "./pictures/main-background.jpeg";
    img.style.height = "100%";
    img.style.objectFit = "scale-down";
    main.appendChild(test);
    test.appendChild(img);
});