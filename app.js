import Logger from "./v1/classes/Logger";
import Server from "./v1/classes/Server";

// Application start
const start = async () => {
  try {
    // Initialize the server
    await Server.init();
  } catch (err) {
    Logger.error(`Error inside app start: ${err.message}`);
    throw err;
    process.exit(1);
  }
};

// Start the server
start();
