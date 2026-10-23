const imgContainer = document.querySelector('.img-container');

const files = [];

async function laadBestanden() {
    try {
        const response = await fetch('/api/list-files');
        const blobs = await response.json();

        console.log("Alle bestanden in Blob:", blobs);

        blobs.forEach(file => {
            console.log(`Bestandsnaam: ${file.pathname}, URL: ${file.url}`);

            const isVideo = file.url.endsWith('.mp4') || file.url.endsWith('.webm');
            files.push({
                url: file.url,
                type: isVideo ? 'video' : 'image'
            });
        });

    } catch (error) {
        console.error("Kon bestanden niet ophalen:", error);
    }
}

laadBestanden();

console.log(files);