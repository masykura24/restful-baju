const express = require("express");

// const cors = require("cors");

const app = express();

// parsing data req => json
app.use(express.json());
//req => urlencoded
app.use(express.urlencoded({ extended: true }));

app.use("uploads", express.static("uploads"));

const db = require("./app/models");
db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.get("/api/products/uploads/:filename", (req, res) => {
  res.sendFile(__dirname + "/uploads/" + req.params.filename);
});

require("./app/routes/post.routes")(app);
require("./app/routes/product.routes")(app);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
