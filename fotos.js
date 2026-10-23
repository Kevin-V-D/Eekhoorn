const imgContainer = document.querySelector('.img-container');

const files = [];

async function laadBestanden() {
    try {
        const response = await fetch('/api/list-files');
        const blobs = await response.json();

        console.log("Alle bestanden in Blob:", blobs);

        blobs.forEach(file => {
            console.log(`Bestandsnaam: ${file.pathname}, URL: ${file.url}`);

            const isVideo = recFile.url.endsWith('.mp4') || recFile.url.endsWith('.webm');
            files.push({
                url: file,
                type: isVideo ? 'video' : 'image'
            });
        });

    } catch (error) {
        console.error("Kon bestanden niet ophalen:", error);
    }
}

laadBestanden();

console.log(files);