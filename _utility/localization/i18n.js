const http = require('http')
const path = require('path')
const { I18n } = require('i18n')


//Set ibn cookie or session and get info
async function localize(){

  const i18n = new I18n({
    locales: ['en', 'de', 'hindi', 'gujrati'],
    directory: path.join(__dirname, 'locales')
  })


  // set to german
  i18n.setLocale('de')

  // will put 'Hallo'
  console.log('Urdu', i18n.__('successfulSignUp'))

  // will also put 'Hallo'
  console.log('german', i18n.__('Hello %s, how are you today?'))

  // will also put 'Hallo'
  console.log('german', i18n.__('Hallo Marcus, wie war dein %s?'))

// -------------------------------------------------

  // set to english
  i18n.setLocale('en')

  // will put 'Hello'
  console.log('english', i18n.__('successfulSignUp'))

  // will also put 'Hello'
  console.log('english', i18n.__('Hello %s, how are you today?'))

  // will also put 'Hello'
  console.log('english', i18n.__('Hallo Marcus, wie war dein %s?'))
  

  //i18n.setLocale('hindi')   // set this using session or cookie
  i18n.setLocale('gujrati')   // set this using session or cookie

  

  return i18n.__('successfulSignUp');

  
  
}

module.exports = { localize }