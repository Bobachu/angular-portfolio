const path = require('path')
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

const transporter = nodemailer.createTransport({

  host: 'smtp.gmail.com',
  provider: 'gmail',
  port: 465,
  secure: true,
  auth: {
    user: 'sendfrom067@gmail.com', // Enter here email address from which you want to send emails
    pass: 'P@55w0rd!!' // Enter here password for email account from which you want to send emails
  },
  tls: {
    rejectUnauthorized: false
  }
});

app.use(express.static(__dirname + '/angularapp'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/angularapp/index.html'))
})

app.use(bodyParser.json());

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/send', function (req, res) {

  let senderName = req.body.contactFormName;
  let senderEmail = req.body.contactFormEmail;
  let messageSubject = req.body.contactFormSubjects;
  let messageText = req.body.contactFormMessage;

  let mailOptions = {
    to: ['bob.church@gmail.com'], // Enter here the email address on which you want to send emails from your customers
    from: senderName,
    subject: messageSubject,
    text: messageText,
    replyTo: senderEmail
  };

  if (senderName === '') {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }

  if (senderEmail === '') {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }

  if (messageSubject === '') {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }

  if (messageText === '') {
    res.status(400);
    res.send({
      message: 'Bad request'
    });
    return;
  }

  transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error);
      res.end('error');
    } else {
      console.log('Message sent: ', response);
      res.end('sent');
    }
  });
});

app.listen(port, function () {
  console.log('Express started on port: ', port);
});
