const express = require("express");
const { Pool } = require("pg");
const dotenv = require("dotenv");
const userRoutes = require("./routes/users");
const userRoutesPG = require("./routes/usersPG");
const calendarPG = require("./routes/calendarPG");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const cors = require("cors"); // Import the cors package

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use("/assets", express.static("src/assets"));
app.use("/api/users", userRoutesPG); // User routes
app.use("/api/", calendarPG); // User routes
app.use("/api/posts", postRoutes); // Post routes
app.use("/api", commentRoutes); // Comment routes

// Create a new pool instance
const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});

// Test the database connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("PostgreSQL connected");
  release();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = pool;
