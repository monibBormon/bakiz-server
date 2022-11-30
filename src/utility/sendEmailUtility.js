var nodemailer = require('nodemailer');

const sendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.monibbormon.com',
        port: 465,
        secure: false,
        auth: {
            user: "_mainaccount@monibbormon.com",
            pass: 'K9rP[D3W1l-qBe2D'
        },tls: {
            rejectUnauthorized: false
        },
    });


    let mailOptions = {
        from: 'Bakiz E-commerce <mail.monibbormon.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    
   return  await transporter.sendMail(mailOptions)

}
module.exports=sendEmailUtility;