import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { config } from "dotenv";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { authRoute } from "./routes/auth";
import { todoRoute } from "./routes/todo";
config();
// initalize application
const app = new Hono();

// middlewares
app.use(logger());
app.use(
  "*",
  cors({
    origin: (origin) => origin,
    allowHeaders: ["Content-Type"],
    credentials: true,
  })
);
app.get("*", serveStatic({ root: "dist" }));
app.get("*", serveStatic({ path: "dist/index.html" }));

// routes
const apiRoutes = app
  .basePath("/api")
  .route("/auth", authRoute)
  .route("/todos", todoRoute);

// launch
let port = Number(process.env.PORT);
serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running on port http://localhost:${port} 🚀`);

export type ApiRoutes = typeof apiRoutes;
