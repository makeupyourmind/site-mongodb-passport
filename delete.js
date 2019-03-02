module.exports = {

delete : function(req,res)
{
  const MongoClient = require("mongodb").MongoClient;
  //console.log("name that need to del : " + req.body.name);
  //console.log("name that need to del : " + req.body.deluser);
  //console.log("photo that need to del : " + req.body.delimg);
  const url = "mongodb://localhost:27017/";
  const mongoClient = new MongoClient(url, { useNewUrlParser: true });

  mongoClient.connect(function(err, client){

      if(err) return console.log(err);

      const db = client.db("MyDatabase");
      db.collection("userInfo").deleteOne({username: req.body.deluser}, function(err, result){

         console.log(result);
         var fs = require('fs');
         var filePath = './photo/' + req.body.delimg;
         fs.unlinkSync(filePath);
         res.send("Your account was deleted.You will be redirected to the main page");
         client.close();
      });
  });

}

}//end module
