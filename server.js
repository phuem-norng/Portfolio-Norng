const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files
app.use(express.static(__dirname));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
