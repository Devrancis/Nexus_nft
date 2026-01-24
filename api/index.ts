import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(express.json({
  verify: (req: any, _res, buf) => {
    req.rawBody = buf;
  },
}));
app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: any = undefined;
  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      log(logLine);
    }
  });
  next();
});

const initApp = async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    console.error("Internal Server Error:", err);
    if (res.headersSent) return next(err);
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
  }
};

if (process.env.NODE_ENV !== "production") {
  initApp().then(() => {
    const port = parseInt(process.env.PORT || "5000", 10);
    httpServer.listen({ port, host: "0.0.0.0" }, () => {
      log(`serving on port ${port}`);
    });
  });
} else {
    initApp();
}

export default app;