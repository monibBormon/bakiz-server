var nodemailer = require('nodemailer');

const sendEmailUtility= async (EmailTo, EmailText, EmailSubject) => {

    let transporter = nodemailer.createTransport({
        host: 'mail.teamrabbil.com',
        port: 25,
        secure: false,
        auth: {
            user: "info@teamrabbil.com",
            pass: '~sR4[bhaC[Qs'
        },tls: {
            rejectUnauthorized: false
        },
    });


    let mailOptions = {
        from: 'Bakiz E-commerce <info@teamrabbil.com>',
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText
    };

    
   return  await transporter.sendMail(mailOptions)

}
module.exports=sendEmailUtility;