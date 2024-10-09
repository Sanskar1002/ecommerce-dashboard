const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/User"); // user modals
const Product = require("./db/Product"); // product modal
const Jwt = require("jsonwebtoken");
const jwtKey = "e-com";
const app = express();

app.use(cors());
app.use(express.json()); //middelware

// add user to db
app.post("/register", async (req, res) => {
  // receives the request
  const user = new User(req.body); // data receive
  let result = await user.save(); // data process
  result = result.toObject();
  delete result.password;
  if (result) {
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        res.send({
          result: "something went wrong please try after some time ",
        });
      }
      res.send({ result, auth: token });
    });
  }
});

//checking user in db
app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    const user = await User.findOne(req.body).select("-password");
    console.log(user);
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
          res.send({
            result: "something went wrong please try after some time ",
          });
        }
        res.send({ user, auth: token });
      });
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "in sufficient data" });
  }
});

// add product in db
app.post("/addproduct", tokenVerification, async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
});

//show products form db
app.get("/showproducts", tokenVerification, async (req, res) => {
  const productList = await Product.find();
  res.send(productList);
});

//show single product form db acccording to id
app.get("/showproduct/:id", tokenVerification, async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });
  res.send(product);
});

// delete product from db according to id
app.delete("/deleteproduct/:id", tokenVerification, async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

//update product using id
app.put("/updateproduct/:id", tokenVerification, async (req, res) => {
  const result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

//search product using different parameters
app.get("/search/:key", tokenVerification, async (req, res) => {
  const result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  res.send(result);
});

// middleware

function tokenVerification(req, res, next) {
  console.log("verification in progress.....");
  const token = req.headers["authorization"];
  if (token) {
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        res.status(401).send({ result: "please enter valid token" });
      } else {
        next();
      }
    });
  } else {
    res.status(403).send({ result: "Please provide token with header" });
  }
  // console.log(token);
  // next();
}
app.listen(5000); //
