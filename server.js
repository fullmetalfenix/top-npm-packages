require('dotenv').config();
const express = require("express");
const app = express();
const port = 3000;
const async = require("async");
const _ = require("lodash");

const cloudinary = require('cloudinary');

const axios = require('axios')

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret
});


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

app.get("/cloudinary", (req, res) =>{
  res.send(cloudinary.image("https://res.cloudinary.com/dv7v39gkl/image/upload/v1692408625/cld-sample-2.jpg"))
})

app.get("/cloudinary-resize", (req, res) =>{
  res.send(cloudinary.image("https://res.cloudinary.com/dv7v39gkl/image/upload/v1692408625/cld-sample-2.jpg", { width: 500, height: 500, crop: "fill", version: "1573726751", cloud_name: "demo", secure: "true", alt: "Mountain top surrounded by clouds"}))
})


app.get("/axios", async (req, res) =>{
  var {data} = await axios('https://swapi.dev/api/people/1')
  res.send(data)

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
