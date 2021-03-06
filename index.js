const express = require('express');
const app = express();
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;
app.listen(port , () => console.log('App listening on port ' + port));

app.use(
  session({
    secret: 'hghtyNN23h',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 300000,
    },
    resave: false,
    saveUninitialized: false,
  })
);

require('./config-passport');

var dbConnect = require('./dbConnect.js');
var sendMessage = require('./sendMessage.js');
var forgotPassword = require('./forgotPassword.js');
var del = require('./delete.js');
var allUser = require('./allUser.js');
var delByAdmin = require('./delByAdmin.js');

app.use('/css', express.static('css'));
app.use('/js', express.static('js'));

app.use('/public', express.static('public'));
app.use(express.static("public"));
app.use(express.static("photo"));
app.use(express.static("authFile"));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', (req, res, next) => {
passport.authenticate('local', function(err, user) {

  if (err) {
    return next(err);
  }
  if (!user) {
    return res.send('err');
  }
  req.logIn(user, function(err) {
    if (err) {
      return next(err);
    }
    //console.log("admin : " + user.username);
    //console.log("admin : " + user.password);
    if(user.username == 'admin' && user.password == 'admin'){
      req.session.returnTo = '/admin';
      return res.send(req.session.returnTo);
    }
    else {
      if(!req.session.returnTo){
        req.session.returnTo = '/home';
        return res.send(req.session.returnTo);
      }
      else {
        //req.session.returnTo = '/home';
        return res.send(req.session.returnTo);
      }
    }
  });

})(req, res, next);
});

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    //console.log("сделал движение", req.user.username);
     //console.log("is auth : " + req.path);
     //res.redirect('/video');
    next();
  } else {
    req.session.returnTo = req.path;
    console.log("from : " + req.path );
    return res.redirect('/log');
  }
};

app.get('/delByAdmin', function(req,res){
  delByAdmin.delByAdmin(req,res);
})

app.get('/allUser', function(req,res){
  allUser.allUser(req,res);
})

app.post('/delete', function(req,res){
  del.delete(req,res);
})

app.post('/getDb', function (req,res){
    dbConnect.findUser(req,res);
})

app.post('/delPhoto', function (req,res) {
  var delPhoto = req.body.str;
  //console.log("req body : " + delPhoto);
  var fs = require('fs');
  var filePath = './photo/' + delPhoto;
  fs.unlinkSync(filePath);
  res.send('ok');
})

app.post('/upload', function(req, res) {
  //console.log("req.files : " + req.data);
  //console.log(req.files.pic.name);
  let sampleFile = req.files.pic;
  if (Object.keys(req.files).length == 0) {
    res.send("Error format");
  }

  var path = './photo/' + sampleFile.name;
  sampleFile.mv('./photo/' + sampleFile.name, function(err) {
    //if (err)
    //  return res.status(500).send(err);
    res.send(sampleFile.name);
  });
});

app.get('/admin', auth, function(req,res){
  res.sendFile(__dirname + '/admin.html');
  //res.end();
})

app.get('/logout', (req, res) => {
  //res.sendFile(__dirname + '/main.html');
  req.logOut();

  req.session.destroy(function (err) {
        res.redirect('/');
    //    res.sendFile(__dirname + '/main.html')
    });
});


app.get('/', (req, res, next) => {
 res.sendFile(__dirname + '/main.html');
});

app.get('/forgotPassword', (req, res) => {
 res.sendFile(__dirname + '/forgotPassword.html');
});

app.post('/forgotPass', (req, res) => {
  forgotPassword.forgotPassword(req, res);
})

app.get('/singup', (req, res, next) => {
 res.sendFile(__dirname + '/signUp.html');
});

app.get('/log', (req, res, next) => {
 res.sendFile(__dirname + '/signIn.html');
});

app.post('/addUser', function(req,res)
{
    dbConnect.addUser(req,res);
})

app.post('/sendMessage', function(req,res)
{
    sendMessage.sendMessage(req,res);
})

app.get('/contact', (req, res, next) => {
 res.sendFile(__dirname + '/contact.html');
});

//var name = 'vasy';
/*app.get('/test', auth, (req, res, next) => {
  console.log(req);
     res.redirect('/gallery.html?' + req.user.username);
});*/

//let i = 0;
app.get('/gallery', auth , (req, res, next) => {
  res.redirect('/gallery.html?' + req.user.username);
  //res.sendFile(__dirname + '/gallery.html');

  /*console.log("i : ", i);
  if(i == 1){
    res.sendFile(__dirname + '/gallery.html');
    i = 0;
  }
  else {
    res.redirect('/gallery?'+req.user.username);
    i++;
  }*/

  //res.sendFile(__dirname + '/gallery.html');
});

app.get('/video', auth, (req, res, next) => {
  res.redirect('/video.html?' + req.user.username);
 //res.sendFile(__dirname + '/video.html');
});

app.get('/home', auth, (req, res, next) => {
  res.redirect('/home.html?' + req.user.username);
 //res.sendFile(__dirname + '/home.html');
});

app.post('/setPhoto', (req, res) => {
  const Filehound = require('filehound');
  //console.log(req.body.photo);
  Filehound.create()
  .ext('jpg', 'jpeg', 'png', 'gif')
  .paths("photo")
  .match("*photo/" + req.body.photo + "*")
  .find((err, htmlFiles) => {
    if (err) return console.error("handle err", err);
    var temp = [];
    temp.push(htmlFiles);

    if(temp != '' ){
        var avatar = temp.toString().split('\\').pop();
        res.send(avatar);
     }
     else {
       res.send("not ok");
     }
   });

})
