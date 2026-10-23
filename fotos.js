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
        const fileCard = document.createElement('div');
        if (file.type === 'image') {
            newFile = document.createElement('img');
        } else {
            newFile = document.createElement('video');
            newFile.controls = true;
        }

        newFile.src = file.url;
        newFile.style.height = "12%";
        newFile.style.width = "auto";

        fileCard.style.overflow = "hidden";
        fileCard.style.margin = "3%";
        fileCard.style.borderRadius = "3px";

        imgContainer.appendChild(fileCard);
        fileCard.appendChild(newFile);
    });
}

pullFiles();