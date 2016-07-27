var express = require('express');
var app = express();
var path = require('path');
var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var objectId = require('mongodb').ObjectID;

app.use(bodyParser.json());

var url = 'mongodb://localhost:27017/farm';

app.put('/animals/:id', function(req, res){

  MongoClient.connect(url, function(err, db){
    var collection = db.collection('animals');
    collection.updateOne({_id: new objectId(req.params.id)}, {$set: req.body})
    db.close();
  })
  res.status(200).end;
})

app.delete('/animals/:id', function(req, res){

  MongoClient.connect(url, function(err, db){
    var collection = db.collection('animals');
    collection.remove({_id: new objectId(req.params.id)})
    db.close();
  })
})

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/form.html'));
})

app.post('/animals', function(req, res){

  MongoClient.connect(url, function(err, db){
    var collection = db.collection('animals');
    collection.insert(req.body);
    // alternatively
    // collection.insert({name: req.body.name, type: req.body.type, age: req.body.age});
    db.close();
  })
})

app.get('/animals', function(req, res){
  
  MongoClient.connect(url, function(err, db){
    var collection = db.collection('animals');
    collection.find({}).toArray(function(err, docs){
      res.json(docs);
      db.close();
    })
  })

})

app.listen('3000', function(){
  console.log('running on 3000!');
})