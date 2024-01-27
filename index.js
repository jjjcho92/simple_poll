let express = require('express')
let app = express()
app.use(express.json())

let Datastore = require('nedb')
let db = new Datastore('counts.db')
db.loadDatabase()

app.post('/counts', (req, res) => {
  let obj = {
    created_at: new Date(),
    ...req.body
  }

  db.insert(obj, (err, newDocs) => {
    console.log(err, newDocs)
    if (err) {
      res.json({task: "task failed"})
    } else {
      res.json({task: "success"})
    }
  })
})

app.get('/counts', (req, res) => {
  console.log(321)
  db.find({})
    .sort({created_at: -1})
    .limit(1)
    .exec((err, docs) => {
      console.log(docs)
      let obj = {data: docs}
      res.json(obj)
    })
})

//Find all the totals and put into Chart.js
app.get('/all-counts', (req, res) => {
  db.find({})
    .sort({created_at: -1})
    .exec((err, docs) => {
      console.log(docs)
      let obj = {data: docs}
      res.json(obj)
    })
})


app.use('/', express.static('public'))

// app.listen(3000, () => {
//   console.log("app is listening at localhost 3000")
// })

let port = process.env.PORT || 3000;
app.listen(port, ()=> {
console.log('listening at ', port);
});

//neDB notation: https://github.com/louischatriot/nedb
// db.remove({}, {multi: true}, function (err, numRemoved) {})
