require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();
const cors = require("cors");
const ROUTES = require("./routes/index");
const path = require("path");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // limit each IP to 100 requests per windowMs
});

require("dotenv").config();
require("./configDB");

app.use(
  session({
    secret: process.env.JWD_TOKEN,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

let corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:4173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:4173",
    "http://108.181.190.64:5173",
    "http://demo.leadconcept.com:5173",
    "https://demo.leadconcept.com:5173",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};
app.use(cors(corsOptions));
app.use(limiter);

// Enable logs and history when LOGS_AND_HISTORY environment variable is set to true.
if(process.env.LOGS_AND_HISTORY === "true"){
  app.use(require("./middlewares/logs"));
  app.use(require("./routes/logs"));
}
app.use("/api/v1", ROUTES);

app.get("/uploads/:folderName/:id", async (req, res) => {
  const { folderName, id } = req.params;
  const imagePath = path.join(__dirname, `/uploads/${folderName}/${id}`); // Replace with your image path
  res.sendFile(imagePath, (err) => {
    if (err) {
      res.status(500).json({message:`Error while getting ${id} `});
    }
  });
});

app.use((err, req, res, next) => {
  const status = err?.status || 500;
  const message = err?.message || "Internal Server Error";
  const data = err?.data || {};
  if (!status && !message && !data) {
    return next();
  }
  res.status(status).json({
    status,
    message,
    data,
  });
});
app.use((req, res) => {
  return res.status(404).json({
    message: `Invalid path: ${req.originalUrl}`,
  });
});

module.exports = app;
