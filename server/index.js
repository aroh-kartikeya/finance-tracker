const express = require("express");
const transactionRoutes = require("./routes/transactionRoutes");
const app = express();
app.use(express.json());
app.use("/transactions", transactionRoutes);
const PORT = process.env.PORT || 5000;

 
app.get("/", (req, res) => {
  res.send("Server is running");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
