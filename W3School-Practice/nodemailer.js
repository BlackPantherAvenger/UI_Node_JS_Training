var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sufiyan.perficient@gmail.com',
    pass: 'AKsufi@7824#'
  }
});

var mailOptions = {
  from: 'sufiyan.perficient@gmail.com',
  to: 'sufiyanakbani18@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log("error",error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});