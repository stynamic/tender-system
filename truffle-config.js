const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  contracts_build_directory: "./src/builds",
  networks: {
      development: {
          host: "127.0.0.1",
          port: 7545,
          network_id: "*"
      },
      rinkeby: {
        provider: () => new HDWalletProvider(
            'MNEMONIC',
            'RPC_ENDPOINT'
        ),
        network_id: "4"
    }
  },
  compilers: {
      solc: {
          version: "0.8.0",
      }
  }
}