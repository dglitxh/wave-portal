const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
     const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
     const waveContract = await waveContractFactory.deploy();
     await waveContract.deployed();
     console.log("Contract deployed to:", waveContract.address);
     console.log("Contract deployed by:", owner.address);

     let waveCount;
     waveCount = await waveContract.getTotalWaves();
      console.log(waveCount.toNumber());

     let waveTxn = await waveContract.wave("the YD message!");
     await waveTxn.wait();
     const [_] = await hre.ethers.getSigners();
     waveTxn = await waveContract.connect(randomPerson).wave("Another message!");
     await waveTxn.wait(); // Wait for the transaction to be mined
   
     let allWaves = await waveContract.getAllWaves();
     console.log(allWaves);
     
     waveCount = await waveContract.getTotalWaves();

};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit()
    }
}


runMain()