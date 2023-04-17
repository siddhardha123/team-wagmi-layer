import { HardhatUserConfig } from "hardhat/config";
import dotenv from 'dotenv'
dotenv.config()
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
      polygon_mumbai: {
          url: "https://polygon-mumbai.g.alchemy.com/v2/2BKX5JkbmGekJaNmVAxYvmlsA5BEVU9K",
          accounts: [process.env.PRIVATE_KEY || "privatekey"]
      }
  }
};

export default config;
