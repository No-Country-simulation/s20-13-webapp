import server from "./server";
import { config } from "dotenv";

config();

const port = process.env.PORT || 3000;

server
  .listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  })

  .on("error", (err) => {
    console.error(`❌ Error occurred while starting server: ${err.message}`);

    process.exit(1);
  });
