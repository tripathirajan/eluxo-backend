const cors = require("cors");

function useCors(app) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];

  app.use(
    cors({
      origin: (origin, cb) =>
        !origin || allowedOrigins.includes(origin)
          ? cb(null, true)
          : cb(new Error("Not allowed by CORS")),
      credentials: true,
    }),
  );
}

module.exports = useCors;
