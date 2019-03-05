module.exports = {

//Пользователь входит на свое страницу
addUser : function(req,res)
{

const MongoClient = require("mongodb").MongoClient;
const url = "mongodb+srv://test:test@cluster0-svpwv.mongodb.net/test?ssl=true&retryWrites=true";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

mongoClient.connect(function(err, client){

    const db = client.db("MyDatabase");
    const collection = db.collection("userInfo");
    console.log(req.body.name);
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

  });

});

},

//Пользователь входит на свое страницу
findUser : function(req,res)
{
  const MongoClient = require("mongodb").MongoClient;
  const url = "mongodb+srv://test:test@cluster0-svpwv.mongodb.net/test?retryWrites=true";
  const mongoClient = new MongoClient(url, { useNewUrlParser: true });

  mongoClient.connect(function(err, client){

      const db = client.db("MyDatabase");
      const collection = db.collection("userInfo");

      if(err) return console.log(err);

      collection.find({username: req.body.name}).toArray(function(err, results){

          res.send(results[0]);
          client.close();
      });
  });

}

}//end module
