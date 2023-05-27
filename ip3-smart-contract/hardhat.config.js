require('hardhat-contract-sizer');
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");



// Go to https://www.alchemyapi.io, sign up, create
// a new App in its dashboard, and replace "KEY" with its key
const ALCHEMY_API_KEY_RINKEBY = "XOYHhyjoymnwKLMEKIb_kGWAWh-CXWRQ";
const ALCHEMY_API_KEY_GOERLI = "ynBOjBUTiACA7HM6j5NgwXAKK4uShZX3"; // deploy --network golerli

// Replace this private key with your Ropsten account private key
// To export your private key from Metamask, open Metamask and
// go to Account Details > Export Private Key
// Be aware of NEVER putting real Ether into testing accounts
const PRIVATE_KEY = "e004ae0c83735acddafb656cc09caa3174b04a69078e3d64b5af7c35dad35b9c";

const USER_PK = "ef7664107a2881846f2992ed5b786cdb259a4958a9eb126b479c90769cc40d04";

const settings = {
  optimizer: {
    enabled: true,
    runs: 1
  },
};



module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.9", settings },
    ],
  },
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY_RINKEBY}`,
      accounts: [`${PRIVATE_KEY}`]
    },
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY_GOERLI}`,
      accounts: [`${PRIVATE_KEY}`, `${USER_PK}`]
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: "43YT5BP2MWN1HMBY5I5IE5BQ7I1FBB5Z2D"
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  }
};