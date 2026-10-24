const name = document.querySelector("#name");
const message = document.querySelector("#message");

async function pullMessages() {
    try {
        const response = await fetch('/api/guestbook', {
            method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
            console.log("data:", data)
            return data;
        } else {
            console.log("error:", data.error);
        }
    } catch (error) {
        console.error('Netwerkfout:', error);
    }
}

const test = await pullMessages();

console.log(test);