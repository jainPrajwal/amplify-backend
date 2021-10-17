const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.json({
    success: false,
    message: "server is up and running..!",
  });
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port :${PORT}`);
});
