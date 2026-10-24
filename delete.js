function renderFile() {
    imgContainer.innerHTML = ''; // Maak leeg om dubbels te voorkomen

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
        newFile.style.height = "120px";
        newFile.style.width = "auto";

        // Maak een delete-knop
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = "Verwijderen";
        deleteBtn.style.display = "block";
        deleteBtn.style.marginTop = "5px";

        // Als er op de knop geklikt wordt:
        deleteBtn.addEventListener('click', async () => {
            if (!confirm(`Weet je zeker dat je ${file.name || 'dit bestand'} wilt verwijderen?`)) return;

            try {
                const response = await fetch('/api/delete-file', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // We sturen de URL mee zodat de server weet welke blob weg moet
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
        fileCard.style.margin = "10px";
        fileCard.style.display = "inline-block";

        fileCard.appendChild(newFile);
        fileCard.appendChild(deleteBtn); // Voeg de knop toe aan de kaart
        imgContainer.appendChild(fileCard);
    });
}