import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());

userRoutes(app);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Something went wrong");
});
