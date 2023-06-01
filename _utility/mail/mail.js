const nodemailer = require("nodemailer");
const { SMTP_HOST, USER_NAME, PASSWORD } = require("../../_config/env");

async function SendMail(from, to, subject, text, html){
    
    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: USER_NAME,
          pass: PASSWORD,
        },
        logger: true
      });


    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: `inShare <${from}>`,
        to: to,
        subject: subject,
        text: text, 
        html: html, 
        headers: { 'x-myheader': 'test header' }
    });


    //console.log("Message sent: %s", info.response);

    return true;
    //return await GeneratePassword(enteredpassword, salt ) === savedpassword;
}



module.exports = {SendMail};