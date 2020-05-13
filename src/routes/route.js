// => node modules
const express = require('express');
const debug = require('debug')('app:routes');
const device = require('express-device');
const fs = require('fs');

const pagerouter = express.Router();

const DB = require('../js/data');
//const Func = require('../js/functions');

function router() {
  pagerouter.route('/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines('no');
        const text = await DB.pages.get.text('no', 0);
        const languages = await DB.languages.published();
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('home', {conf, text})
      }())
    });
  pagerouter.route('/:language')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 0);
        const languages = await DB.languages.published();
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('home', {conf, text})
      }())
    });

  pagerouter.route('/:language/food/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 3);
        const languages = await DB.languages.published();
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('food', {conf, text})
      }())
    });

  pagerouter.route('/:language/rental/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 2);
        const pictures = await DB.pages.get.pictures('rental');
        const languages = await DB.languages.published();
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('rental', {conf, text, pictures})
      }())
    });

  pagerouter.route('/:language/sale/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 4);
        const languages = await DB.languages.published();
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('sale', {conf, text})
      }())
    });

  pagerouter.route('/:language/service/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 1);
        const pictures = await DB.pages.get.pictures('service');
        const languages = await DB.languages.published();
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('service', {conf, text, pictures})
      }())
    });

  return pagerouter;
}

module.exports = router;
