const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")

const productRoutes = require("./routes/ProductRoutes")
const authRoutes = require("./routes/AuthRoutes")

dotenv.config()

const app = express()

// ============================================================
// MIDDLEWARE
// ============================================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(express.json())

// ============================================================
// ROUTES
// ============================================================

app.use("/api/products", productRoutes)
app.use("/api/auth", authRoutes)

// ============================================================
// HOME ROUTE
// ============================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Cloud Cart Backend is running 🚀",
  })
})

// ============================================================
// HEALTH CHECK
// ============================================================

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Cloud Cart API is healthy",
    database:
      mongoose.connection.readyState === 1
        ? "MongoDB Atlas connected"
        : "MongoDB not connected",
  })
})

// ============================================================
// MONGODB ATLAS CONNECTION
// ============================================================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Atlas connected successfully")
  })
  .catch((error) => {
    console.error("❌ MongoDB connection failed:")
    console.error(error.message)
  })

// ============================================================
// SERVER
// ============================================================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Cloud Cart Backend running on port ${PORT}`)
})