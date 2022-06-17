const Web3 = require('web3');

let provider;

/* provider for rinkeby test netowrk */
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = window.ethereum;
} else {
    provider = new Web3.providers.HttpProvider('RPC_ENDPOINT');
}

/* provider for local test netowrk */
/*
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    provider = window.ethereum;
} else {
    provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
}
*/

module.exports = provider;