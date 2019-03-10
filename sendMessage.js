module.exports = {

//Пользователь входит на свое страницу
sendMessage : function(req,res)
{
  res.send("ok");
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: 'marinanov040167@gmail.com',					//receiver's email
    from: req.body.email,			//sender's email
    subject: req.body.subject,//Subject
    text: req.body.message + '\n\nMy name is : ' + req.body.name		//content		//HTML content
  };
  sgMail.send(msg);

}

}//end module
