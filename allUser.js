module.exports = {

allUser : function(req,res)
{
  const MongoClient = require("mongodb").MongoClient;
  const url = "mongodb+srv://test:test@cluster0-svpwv.mongodb.net/test";
  const mongoClient = new MongoClient(url, { useNewUrlParser: true });

  mongoClient.connect(function(err, client){

      const db = client.db("MyDatabase");
      const collection = db.collection("userInfo");

      if(err) return console.log(err);

      collection.find().toArray(function(err, results){

       //console.log(results);
       res.send(results);
       client.close();
   });

  });

}

}//end module
