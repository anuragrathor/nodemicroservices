require('dotenv').config();
module.exports = {
    origin : 'http://localhost:8080',
    port: {
        authentication: 8081,
        business: 8082
    },
    SMTP_HOST: 'smtp-relay.sendinblue.com',
    USER_NAME: 'anuragprofitfox@gmail.com',
    PASSWORD: '6JnZsEc1t9UpPK7C',
    EMAIL_FROM: 'anuragprofitfox@gmail.com'
}