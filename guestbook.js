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
            data.forEach(post => {
                const postName = document.createElement("p");
                const postMessage = document.createElement("p");

                postName.innerText = post.name;
                postMessage.innerText = post.message;

                main.appendChild(postName);
                main.appendChild(postMessage);
            });
        } else {
            console.log("error:", data.error);
        }
    } catch (error) {
        console.error('Netwerkfout:', error);
    }
}

pullMessages();