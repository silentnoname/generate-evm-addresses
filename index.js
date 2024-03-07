const { ethers } = require("ethers");
const { entropyToMnemonic } = require("@ethersproject/hdnode");

function generateMnemonic(length) {
    let bytesNum = 16; // Default for 12 words
    switch (length) {
        case 12:
            bytesNum = 16;
            break;
        case 18:
            bytesNum = 24;
            break;
        case 24:
            bytesNum = 32;
            break;
        default:
            throw new Error("Invalid length");
    }

    const bytes = ethers.utils.randomBytes(bytesNum);
    const mnemonic = entropyToMnemonic(bytes);
    return mnemonic;
}

function generateWallet() {
    const mnemonic = generateMnemonic(24); // Generate a 24-word mnemonic
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);

    const walletData = {
        id: 0, // This should probably be set more dynamically in a real use case
        mnemonic: mnemonic,
        address: wallet.address
    };
    return walletData;
}

function generateWalletsAndSave(num, filename) {
    const fs = require('fs');

    // Check if the file already exists
    if (fs.existsSync(filename)) {
        console.log("File exists, exiting");
        return;
    }

    const wallets = [];
    for (let i = 0; i < num; i++) {
        const wallet = generateWallet();
        wallet.id = i; // Set the wallet id
        wallets.push(wallet);
    }

    // Convert the wallets array to a JSON string
    const data = JSON.stringify(wallets);

    // Write the JSON string to the specified file
    fs.writeFile(filename, data, (err) => {
        if (err) {
            throw err;
        }
        console.log('Data written to file');
    });
}

generateWallet()

// Export functions if needed
module.exports = {
    generateMnemonic,
    generateWallet,
    generateWalletsAndSave
};