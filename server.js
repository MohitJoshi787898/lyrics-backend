require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("DB Connection Error:", err));

// Routes
const songRoutes = require("./routes/songRoutes");
app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use("/api/songs", songRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
