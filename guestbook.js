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
            createCard(data);
        } else {
            console.log("error:", data.error);
        }
    } catch (error) {
        console.error('Netwerkfout:', error);
    }
}

function createCard(data) {
    data.forEach(post => {
        const card = document.createElement("div");
        const userDiv = document.createElement("div");
        const commentDiv = document.createElement("div");
        const postName = document.createElement("p");
        const postMessage = document.createElement("p");

        card.className = "post";
        userDiv.className = "user";
        postName.innerText = `Naam:\n${post.name}`;
        postMessage.innerText = `Bericht:\n${post.message}`;

        main.appendChild(card);
        card.appendChild(userDiv);
        card.appendChild(commentDiv);
        userDiv.appendChild(postName);
        commentDiv.appendChild(postMessage)
    });
}

pullMessages();