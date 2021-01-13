require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.json());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

///routes

app.use("/user", require("./routes/userRouter"));
app.use("/api", require("./routes/categoryRouter"));
app.use("/api", require("./routes/upload"));
app.use("/api", require("./routes/productRouter"));
////connect to mongodb

const URI = process.env.MONGODB_URL;
mongoose
  .connect(URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connedted to mongodb"))
  .catch((err) => console.log(err));

// app.get("/", (req, res) => {
//   res.send("hello");
// });

const { sendEmail } = require('./mail');

app.post("/api/sendMail", (req, res) => {
  // let da=req.body
module.exports.total=req.body.total
module.exports.date=req.body.date
module.exports.title=req.body.title
module.exports.quantity=req.body.quantity
// console.log(da)
  console.log(req.body)
  sendEmail(req.body.email, req.body.name, "hello")

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
