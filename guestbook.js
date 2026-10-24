import { createElement } from "react";

const name = document.querySelector("#name");
const message = document.querySelector("#message");
let guestbook = [];

async function pullMessages() {
    try {
        const response = await fetch('/api/database', {
            method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
            console.log("data:", data)
            guestbook = data;
        } else {
            console.log("error:", data.error);
        }
    } catch (error) {
        console.error('Netwerkfout:', error);
    }
}

pullMessages();

data.forEach(post => {
    name = createElement("p");
    message = createElement("p");

    name.innerText = post.name;
    message.innerText = post.message;

    document.body.appendChild(name);
    document.body.appendChild(message);
});