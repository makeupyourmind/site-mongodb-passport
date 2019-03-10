module.exports = {

//Пользователь входит на свое страницу
forgotPassword: function(req,res)
{

const MongoClient = require("mongodb").MongoClient;
const url = process.env.DATABASE_URL2 || "mongodb+srv://test:test@cluster0-svpwv.mongodb.net/test?ssl=true&retryWrites=true";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });

//let users = [{username: req.body.name, password: req.body.password, email: req.body.email }];

mongoClient.connect(function(err, client){

    const db = client.db("MyDatabase");
    const collection = db.collection("userInfo");

    collection.find({email: req.body.email}).toArray(function(err, results){

        if(results.length > 0){
          console.log(results[0].password);
          res.send("ok");
          const sgMail = require('@sendgrid/mail');
          sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
            to: req.body.email,					//receiver's email
            from: 'marinanov040167@gmail.com',			//sender's email
            subject: 'Forgot password',//Subject
            text: '\n\nYour password is ' + results[0].password + '\n\nFrom site support'		//content		//HTML content
          };
          sgMail.send(msg);
        }
        else
        {
          res.send("Error email");
        }

    });

});

}

}//end module
