const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();
    /**
     * deploy shop implementation ,proxy created by factory contract 
     */
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
    
    // deploy the web3shop factory contract
    const IP3Factory = await ethers.getContractFactory("IP3");
    // fake USDC 0x07865c6E87B9F70255377e024ace6630C1Eaa37F, https://goerli.etherscan.io/token/0x07865c6e87b9f70255377e024ace6630c1eaa37f
    const USDCAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F"; // in goerli 
    const ip3Factory = await IP3Factory.deploy(USDCAddress);
    console.log("Ip3 contract address:", ip3Factory.address);

    setTimeout(() => {  console.log("World!"); }, 1000*30);

    console.log("complete deploy ip3 contract");
    
}
main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});
