const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5030;
//mongodb+srv://rmsdlf2580:rmsdlf0579@cluster0.zfy0dyf.mongodb.net/?retryWrites=true&w=majority
//bodyparor
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { Post } = require("./Model/Post.js");
app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://rmsdlf2580:rmsdlf0579@cluster0.zfy0dyf.mongodb.net/Community?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("start server");
      console.log("connecting mongoDB...");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

app.post("/api/test", (req, res) => {
  const CommunityPost = new Post({ title: "test", content: "this is test" });
  CommunityPost.save().then(() => {
    res.status(200).json({ success: true, text: "hi h i" });
  });
});
