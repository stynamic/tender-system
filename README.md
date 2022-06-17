# tender-system
Tender System is a decentralized application build over Ethereum blockchain. It helps to create, pass and manage the tenders.

----

STEP 1:  
Clone the repository and install packages

* clone  
`$ git clone https://github.com/stynamic/tender-system.git`  
`$ cd tender-system`
* install dependency packages  
`$ npm install`

STEP 2:  
Edit files

* `truffle-config.js` file  
rinkeby network, change `'MNEMONIC'` and `'RPC_ENDPOINT'`  
local test network, change `host` and `port` with respective local network

* `provider.js` file (locate `src/utils/provider.js`)  
change `'RPC_ENDPOINT'`

STEP 3:  
Install truffle

* run  
`$ npm install -g truffle`

STEP 4:  
Compile and Deploy

* to compile  
`$ truffle compile`  
add `--all` flag to override previous build
* to deploy  
local network, `$ truffle migrate`  
rinkeby network, `$ truffle migrate --network rinkeby`  
add `--reset` flag to override previous migration

STEP 5:  
Start the server

* run  
`$ npm start`
