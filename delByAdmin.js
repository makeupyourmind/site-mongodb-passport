module.exports = {

delByAdmin : function(req,res)
{
  var mongodb = require('mongodb');
  const MongoClient = require("mongodb").MongoClient;
  //console.log("tyt");
  console.log("id that need to del : " + req.query.id);
  //console.log("name that need to del : " + req.body.deluser);
  //console.log("photo that need to del : " + req.body.delimg);
  const url = "mongodb+srv://test:test@cluster0-svpwv.mongodb.net/test?ssl=true&retryWrites=true";
  const mongoClient = new MongoClient(url, { useNewUrlParser: true });

  mongoClient.connect(function(err, client){

      if(err) return console.log(err);

      const db = client.db("MyDatabase");
      db.collection("userInfo").deleteOne({_id: new mongodb.ObjectID( req.query.id)}, function(err, result){

         console.log(result);
         res.send("ok");

         client.close();
      });
  });

}

}//end module
