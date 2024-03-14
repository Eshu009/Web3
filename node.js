const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const VotingSystemContract = require('./VotingSystem.json'); // Load compiled contract ABI

const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545'); // Connect to local Ethereum node

const contractAddress = 'CONTRACT_ADDRESS'; // Replace with your deployed contract address
const contract = new web3.eth.Contract(VotingSystemContract, contractAddress);

app.post('/register', async (req, res) => {
    const { name, walletAddress } = req.body;
    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.register(name).send({ from: walletAddress });
        res.json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.post('/vote', async (req, res) => {
    const walletAddress = 'WALLET_ADDRESS'; // Replace with the user's wallet address
    try {
        const hasVoted = await contract.methods.hasVoted(walletAddress).call();
        if (hasVoted) {
            res.json({ message: 'You have already voted' });
        } else {
            await contract.methods.vote().send({ from: walletAddress });
            res.json({ message: 'Vote successful' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
