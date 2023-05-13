import Logger from "./utilities/Logger";
import Server from "./utilities/Server";

// Application start
const start = async () => {
  try {
    // Initialize the server
    await Server.init();
  } catch (err) {
    Logger.error(`Error inside app start: ${err.message}`);
    throw err;
    // process.exit(1);
  }
};

// Start the server
start();
