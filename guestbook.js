const main = document.querySelector("main");
const name = document.querySelector("#name");
const message = document.querySelector("#message");

async function pullMessages() {
    try {
        const response = await fetch('/api/database', {
            method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
            console.log("data:", data)
            
        } else {
            console.log("error:", data.error);
        }
    } catch (error) {
        console.error('Netwerkfout:', error);
    }
}

function createCard(post) {
    data.forEach(post => {
        const card = document.createElement("div");
        const postName = document.createElement("p");
        const postMessage = document.createElement("p");

        card.className = "post";
        postName.innerText = post.name;
        postMessage.innerText = post.message;

        main.appendChild(postName);
        main.appendChild(postMessage);
    });
}

pullMessages();