const imgContainer = document.querySelector('.img-container');

const files = [];

async function pullFiles() {
    try {
        const response = await fetch('/api/list-files');
        const blobs = await response.json();

        console.log("Alle bestanden in Blob:", blobs);

        blobs.forEach(file => {
            const isVideo = file.url.endsWith('.mp4') || file.url.endsWith('.webm');
            files.push({
                url: file.url,
                type: isVideo ? 'video' : 'image'
            });
        });

        renderFile();
        console.log(files[0]);

    } catch (error) {
        console.error("Kon bestanden niet ophalen:", error);
    }
}

function renderFile() {
    files.forEach(file => {
        let newFile;
        if (file.type === 'image') {
            newFile = document.createElement('img');
        } else {
            newFile = document.createElement('video');
            newFile.controls = true;
        }

        newFile.src = file.url;
        newFile.style.height = "100px";
        newFile.style.width = "auto";

        imgContainer.appendChild(newFile);
    });
}

pullFiles();