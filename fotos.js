const imgContainer = document.querySelector('.img-container');

const files = [];

async function laadBestanden() {
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

        console.log(files[0]);

    } catch (error) {
        console.error("Kon bestanden niet ophalen:", error);
    }
}

laadBestanden();