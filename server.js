require('dotenv').config();
const express = require("express");
const app = express();
const port = 3000;
const async = require("async");
const _ = require("lodash");
// const cloudinary = require('cloudinary').v2
// cloudinary.url("sample.jpg", {width: 100, height: 150, crop: "fill", fetch_format: "auto"})



//sends in parallel - returns array of values
//// Reflect makes values return as objects- otherwise returns as array but on error only returns error. Returns in order they came in.
async
  .parallel([
    function (callback) {
      setTimeout(function () {
        callback(null, "two");
      }, 5000);
    },
    async.reflect(async () => await Promise.resolve("Like")),
    function (callback) {
      setTimeout(function () {
        callback(null, "two again");
      }, 1000);
    },
    async.reflect(async () => await Promise.resolve("Share")),
  ])
  .then((response) => {
    console.log("response", response);
  })
  .catch((err) => {
    console.log(err);
  });

// also async.forEachOfLimit(arrayToItterate, numOfAsyncOperationsAtOnce, [value,index, callback])

var posts = [
  { name: "john", id: 1, town: "New York" },
  { name: "jane", id: 2, town: "New York" },
  { name: "johnny", id: 3, town: "Montauk" },
  { name: "human", id: 4, town: "New York" },
];

// lodash ///

app.get("/", (req, res) => {
  var getUsers = _.filter(posts, { town: "New York" });
  res.send(getUsers);
});

app.get('/test', (req,res) =>{
  res.send(process.env.USER_ID)
})

// app.get("/cloudinary", (req, res) =>{
//   res.send(cloudinary.image("https://res.cloudinary.com/demo/image/upload/c_crop,h_200,w_300,x_355,y_410/c_fill,h_100,w_130/brown_sheep.jpg", { width: 500, height: 500, crop: "fill", version: "1573726751", cloud_name: "demo", secure: "true", alt: "Casual Jacket"}))
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
