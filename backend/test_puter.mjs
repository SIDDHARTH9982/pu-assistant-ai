import puter from '@heyputer/puter.js';

async function test() {
    try {
        const response = await puter.ai.chat("Explain quantum computing in simple terms", {model: 'claude-sonnet-4-6'});
        console.log("Success Response:", JSON.stringify(response, null, 2));
    } catch (e) {
        console.error("Catch Error:", e);
    }
}

test();
