var CronJob = require('cron').CronJob;
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: 'kendaltuanis@hotmail.com',
      pass: 'yarekirinoe2cucku1'
    }
  });
  
  var mailOptions = {
    from: 'kendaltuanis@hotmail.com',
    to: 'info@extintoresuniversales.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };
  
 

var job = new CronJob({
  cronTime: '00 0 0 * * 1-5',
  onTick: function() {
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  },
  start: false,
  timeZone: 'America/Los_Angeles'
});
job.start();