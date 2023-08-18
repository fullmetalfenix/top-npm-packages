const express = require('express')
const app = express()
const port = 3000
const async = require('async')
const _ = require('lodash');
//sends in parallel - returns array of values
//// Reflect makes values return as objects- otherwise returns as array but on error only returns error. Returns in order they came in.
async.parallel([
  function(callback) {
    setTimeout(function() {
        callback(null, 'two');
    }, 5000)},
  async.reflect(async () => await Promise.resolve('Like')),
  function(callback) {
    setTimeout(function() {
        callback(null, 'two again');
    }, 1000)},
  async.reflect(async () => await Promise.resolve('Share')),
])
.then(response =>{
  console.log('response', response);
})
.catch(err => {
  console.log(err)
})

// also async.forEachOfLimit(arrayToItterate, numOfAsyncOperationsAtOnce, [value,index, callback])




var posts = [
  {"name": 'john', id: 1, "town": "New York" },
  {"name": 'jane', id: 2, "town": "New York"},
  {"name": 'johnny', id: 3, "town": "Montauk"},
  {"name": 'human', id: 4, "town": "New York"},
]



// lodash /// 




app.get('/', (req, res) => {

  var getUsers = _.filter(posts, {"town": "New York"})
  res.send(getUsers)
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})