const nodemailer = require("nodemailer");
const { SMTP_HOST, USER_NAME, PASSWORD } = require("../_config/env");

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


function emailLayout(user, content, link = '', link_title = 'Verify Account') {
  var html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title></title><meta name="viewport" content="width=device-width, initial-scale=1.0"></head><body><div style="margin: auto; width: 90%;background:#7D3030;"><div style="padding: 0 15%;"><table width="100%"><tbody><tr><td style="text-align: center;margin-top:50px"><a>Dotcompal</a></td></tr></tbody></table></div><br><br><div class="middle" style="height: 500px;"><div  style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="padding: 18px 0 10px; line-height: 22px; text-align: inherit; " height="100%" valign="top"><h2><span style="font-size: 16px"><span style="color: #fff; font-family: Roboto, Helvetica, sans-serif; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; white-space: pre-wrap">Hi ${user} </span></span></h2></td></tr></tbody></table></div><div  style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="padding: 0; line-height: 22px; text-align: justify" height="100%" valign="top" bgcolor=""><div><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; white-space: pre-wrap"> ${content}</span></div><div>&nbsp;</div>`;
  if (link !== '') {
      html += `<a style="background-color: rgba(255, 83, 61, 1); border: 1px solid rgba(255, 83, 61, 1); border-radius: 40px; color: rgba(255, 255, 255, 1); display: inline-block; font-family: arial, helvetica, sans-serif; font-size: 14px; font-weight: normal; letter-spacing: 0; line-height: 16px; padding: 12px 18px; text-align: center; text-decoration: none" href="${link}">${link_title}</a>`;
    }
  html += `</td></tr></tbody></table></div><div style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="padding: 0; line-height: 22px; text-align: justify" height="100%" valign="top"><div>&nbsp;</div><div><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; white-space: pre-wrap">Thank you, </span></div><div><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal; white-space: pre-wrap">Dotcompal</span></div></td></tr></tbody></table></div><div style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="padding: 0 0 30px" bgcolor=""></td></tr></tbody></table></div></div><div style="padding: 0 15%;"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed"><tbody><tr><td style="background: #ff533d; padding: 18px 0; line-height: 22px; text-align: inherit" height="100%" valign="top"><div style="text-align: center"><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal;">CONTACT NUMBER:</span></div><div style="text-align: center">&nbsp;</div><div style="text-align: center"><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal;"> </span></div><div style="text-align: center"><span style="font-family: arial black, helvetica, sans-serif"><em><strong><span style="border-style: none; outline: none; border-radius: 0; font-weight: normal; color:#fff; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal;"></span></strong></em></span></div><div style="text-align: center">&nbsp;</div><div style="text-align: center"><span style="color:#fff; font-family: Roboto, Helvetica, sans-serif; font-size: 15px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: normal;">© 2021. All rights reserved.</span></div></td></tr></tbody></table></div></div></body></html>`;
  return html;
}


module.exports = {SendMail, emailLayout};