const http = require("http");
const { setupServer, applyErrorHandlers } = require("./server");

const app = setupServer();

/**
 * Middlewares
 */

/**
 * routes
 */

/**
 * Server setup
 */
const server = http.createServer(app);

server.listen(process.env.PORT || 3000, () => {
  const address = server.address();
  const host = typeof address === "string" ? address : address.address;
  const port = typeof address === "string" ? 0 : address.port;
  console.info(`Server is running at http://${host}:${port}`);
  console.info(`Press Ctrl+C to stop the server`);
});
// setup routes here
// gracefully handle shutdown
process.on("SIGINT", () => {
  console.info("Shutting down server...");
  server.close(() => {
    console.info("Server has been shut down gracefully.");
    process.exit(0);
  });
});

applyErrorHandlers(app);
