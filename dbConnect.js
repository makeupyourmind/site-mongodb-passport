module.exports = {

//Пользователь входит на свое страницу
addUser : function(req,res)
{

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

//let users = [{username: req.body.name, password: req.body.password, email: req.body.email }];
//console.log(req.body.clock)
mongoClient.connect(function(err, client){

    const db = client.db("MyDatabase");
    const collection = db.collection("userInfo");

    collection.find({username: req.body.name}).toArray(function(err, results){

        if(results.length > 0){
          res.send();
        }
        else
        {
          collection.insertOne({username: req.body.name, password: req.body.password, email: req.body.email, dateOfRegistr: req.body.clock }, function(err, results){

              console.log(results);
              res.sendFile(__dirname + '/home.html');
              client.close();
          });
        }


    /*collection.insertOne({username: req.body.name, password: req.body.password, email: req.body.email }, function(err, results){

        console.log(results);
        res.sendFile(__dirname + '/home.html');
        client.close();
    });*/


    });

});

},

//Пользователь входит на свое страницу
findUser : function(req,res)
{
  const MongoClient = require("mongodb").MongoClient;
  //console.log("name : " + req.body.name);
  const url = "mongodb://localhost:27017/";
  const mongoClient = new MongoClient(url, { useNewUrlParser: true });

  mongoClient.connect(function(err, client){

      const db = client.db("MyDatabase");
      const collection = db.collection("userInfo");

      if(err) return console.log(err);

      collection.find({username: req.body.name}).toArray(function(err, results){

          //console.log("results email : " + results[0].email);
          res.send(JSON.stringify(results[0]));
          client.close();
      });
  });

}

}//end module
