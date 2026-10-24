const imgContainer = document.querySelector('.img-container');
let files = []; // Maak de array aan

async function pullFiles() {
    try {
        const response = await fetch('/api/list-files');
        const blobs = await response.json();

        // Leeg de array eerst zodat je geen dubbele items krijgt bij een refresh
        files = [];

        blobs.forEach(file => {
            const isVideo = file.url.endsWith('.mp4') || file.url.endsWith('.webm');
            files.push({
                name: file.pathname, // Belangrijk voor je delete alert!
                url: file.url,
                type: isVideo ? 'video' : 'image'
            });
        });

        // Nu de data binnen is, roepen we pas de render-functie aan!
        renderFile();

    } catch (error) {
        console.error("Kon bestanden niet ophalen:", error);
    }
}

function renderFile() {
    imgContainer.innerHTML = ''; // Maak de container leeg

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
        newFile.style.height = "90%";
        newFile.style.width = "auto";

        // Maak een delete-knop
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Verwijderen";
        deleteBtn.style.display = "block";
        deleteBtn.style.marginTop = "0";

        // Als er op de knop geklikt wordt:
        deleteBtn.addEventListener('click', async () => {
            if (!confirm(`Weet je zeker dat je ${file.name || 'dit bestand'} wilt verwijderen?`)) return;

            try {
                const response = await fetch('/api/delete-file', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ url: file.url }) 
                });

                const result = await response.json();

                if (result.success) {
                    // Haal de galerij direct opnieuw op om de lijst te verversen!
                    pullFiles();
                } else {
                    alert('Fout bij verwijderen: ' + result.error);
                }
            } catch (err) {
                console.error("Netwerkfout:", err);
            }
        });

        fileCard.style.overflow = "hidden";
        fileCard.style.margin = "3%";
        fileCard.style.borderRadius = "3px";
        fileCard.style.height = "30%";
        fileCard.style.width = "min-content";
        fileCard.style.display = "inline-block";

        fileCard.appendChild(newFile);
        fileCard.appendChild(deleteBtn);
        imgContainer.appendChild(fileCard);
    });
}

// 🚀 HIER START ALLES: Roep de functie aan zodra de pagina laadt
pullFiles();