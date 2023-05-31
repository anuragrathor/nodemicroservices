const express = require("express");
const http = require('http')
const path = require('path')
const { I18n } = require('i18n')



const i18n = new I18n({
  locales: ['en', 'de', 'hindi', 'gujrati'],

  // sets a custom cookie name to parse locale settings from
  cookie: 'arlocalizename',

  defaultLocale: 'en',

  directory: path.join(__dirname, 'locales')
});

module.exports = i18n;
