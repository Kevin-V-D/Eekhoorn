import { upload } from 'https://esm.sh/@vercel/blob';

const uploadbtn = document.querySelector("#fileInput");

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

    } catch (error) {
        // Hier printen we de exacte foutmelding op je scherm én in de console!
        console.error('Upload mislukt:', error);
        alert('Upload mislukt: ' + error.message);
    }
});

window.addEventListener("DOMContentLoaded", async () => {
    const response =ował = await fetch("./api/check-auth", {
        method: "GET"
    });

    const data = await response.json();

    if (!data.success) {
        window.location.href = "/index.html";
    } else {
        document.querySelector(".loading").style.display = "none";
    }
});