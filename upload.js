import { upload } from 'https://esm.sh/@vercel/blob/client';

const uploadbtn = document.querySelector("#fileInput");
const imgContainer = document.querySelector(".imgContainer");

uploadbtn.addEventListener("change", async (event) => {
    const chosenFile = event.target.files[0];
    if (!chosenFile) return;

    try {
        console.log("Bezig met uploaden van:", chosenFile.name);

        const newBlob = await upload(chosenFile.name, chosenFile, {
            access: 'public',
            handleUploadUrl: '/api/upload-token',
        });

        console.log('Upload gelukt! De URL is:', newBlob.url);
        alert('Bestand succesvol geüpload!');
        imgContainer.innerHTML = "";
        pullFiles();

    } catch (error) {
        console.error('Upload mislukt:', error);
        alert('Er ging iets mis bij het uploaden.');
    }
});

window.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("./api/check-auth", {
        method: "GET"
    });

    const data = await response.json();

    if (!data.success) {
        window.location.href = "login.html";
    } else {
        document.querySelector(".loading").style.display = "none";
    }
});