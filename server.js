import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import transactionRoutes from "./routes/transaction.js";
import budgetRoutes from "./routes/budget.js";
import savingsGoalRoutes from "./routes/savingsGoal.js";
import cors from "cors";

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());

// Cross Origin Resource sharing configuration to the server for accepting requests from certain/all origins
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/savings-goals", savingsGoalRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
