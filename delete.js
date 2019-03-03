module.exports = {

delete : function(req,res)
{
  const MongoClient = require("mongodb").MongoClient;
  //console.log("image : " + req.body.delimg);
  if(req.body.delimg == ''){
    console.log("НЕТ ФОТО У ПОЛЬЗОВАТЕЛЯ");
    const url = "mongodb+srv://test:test@cluster0-svpwv.mongodb.net/test?retryWrites=true";
    const mongoClient = new MongoClient(url, { useNewUrlParser: true });

    mongoClient.connect(function(err, client){

        if(err) return console.log(err);

        const db = client.db("MyDatabase");
        db.collection("userInfo").deleteOne({username: req.body.deluser}, function(err, result){

           console.log(result);
           res.send("Your account was deleted.You will be redirected to the main page");
           client.close();
        });
    });
  }else {
    const url = "mongodb+srv://test:test@cluster0-svpwv.mongodb.net/test?retryWrites=true";
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
  /*const url = "mongodb+srv://test:test@cluster0-svpwv.mongodb.net/test?retryWrites=true";
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
  });*/

}

}//end module
