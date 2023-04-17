import { HardhatUserConfig } from "hardhat/config";
import dotenv from 'dotenv'
dotenv.config()
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
      polygon_mumbai: {
          url: "https://polygon-mumbai.g.alchemy.com/v2/mPMnFvyCsSVLAFmXrTV7et0d94i9ss0X",
          accounts: [process.env.PRIVATE_KEY || "privatekey"]
      }
  }
};

export default config;
