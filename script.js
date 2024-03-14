const registerForm = document.getElementById('registerForm');
const voteForm = document.getElementById('voteForm');
const message = document.getElementById('message');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const walletAddress = document.getElementById('walletAddress').value;

    // Call backend API to register user
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, walletAddress })
        });
        const data = await response.json();
        message.textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
    }
});

voteForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Call backend API to vote
    try {
        const response = await fetch('/vote', {
            method: 'POST'
        });
        const data = await response.json();
        message.textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
    }
});
