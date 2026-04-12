import puter from '@heyputer/puter.js';

async function test() {
    try {
        const response = await puter.ai.chat("Explain quantum computing in simple terms", {model: 'claude-sonnet-4-6'});
        console.log("Success:", response.message.content[0].text);
    } catch (e) {
        console.error("Error:", e);
    }
}

test();
