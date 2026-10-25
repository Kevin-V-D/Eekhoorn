const posts = document.querySelector(".posts");
const naam = document.querySelector("#name");
const bericht = document.querySelector("#message");
const btn = document.querySelector(".button");

async function pullMessages() {
    try {
        const response = await fetch('/api/database', {
            method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
            console.log("data:", data);
            createCard(data);
        } else {
            console.log("error:", data.error);
        }
    } catch (error) {
        console.error('Netwerkfout:', error);
    }
}

async function postMessage() {
    try {
        const response = await fetch('/api/database', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: naam.value,
                message: bericht.value
            })
        });

        const data = await response.json();

        if (response.ok) {
            console.log("data:", data);
            naam.value = "";
            bericht.value = "";
            posts.innerHTML = "";
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

        posts.appendChild(card);
        card.appendChild(userDiv);
        card.appendChild(commentDiv);
        userDiv.appendChild(postName);
        commentDiv.appendChild(postMessage)
    });
}

pullMessages();

btn.addEventListener("click", () => {
    if (!naam) {
        p = document.createElement("p");
        p.innerText = "Je moet een naam invullen";
        posts.prepend(p);
        return;
    }

    if (!bericht) {
        p = document.createElement("p");
        p.innerText = "Je moet een bericht invullen";
        posts.prepend(p);
        return;
    }

    postMessage();
});