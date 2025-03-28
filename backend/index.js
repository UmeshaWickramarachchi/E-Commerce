const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const fs = require("fs");

require("dotenv").config();
connectDB();

const uploadDir = path.join(__dirname, "upload/images");
fs.mkdirSync(uploadDir, { recursive: true });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3000"], credentials: true }));

app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/upload/images", express.static(uploadDir));

app.listen(4000, () => console.log("Server running on port 4000"));
