const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/Database");
const router = require("./routes/Router");

const app = express();
dotenv.config()
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', router)
connectDB()

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

