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
  
  pagerouter.route('/:language/adventure/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 4);
        const pictures = await DB.pages.get.pictures('adventure');
        const languages = await DB.languages.published();
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('adventure', {conf, text, pictures})
      }())
    });

  pagerouter.route('/:language/food/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 3);
        const pictures = await DB.pages.get.pictures('food');
        const languages = await DB.languages.published();
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('food', {conf, text, pictures})
      }())
    });

  pagerouter.route('/:language/rental/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 2);
        const pictures = await DB.pages.get.pictures('rental');
        const languages = await DB.languages.published();
        const toolButton = await DB.buttons.get.text(req.params.language, 'btnTools');
        var buttons = {toolButton: toolButton};
        var conf = {device: req.device.type.toLowerCase(), pages: pages, languages: languages}
        res.render('rental', {buttons, conf, text, pictures})
      }())
    })
    .post((req, res) => {
      (async function dbQuery() {
        if (req.body.request === 'tools') {
          const tools = await DB.tools.get(req.params.language);
          res.json(tools)
        }
      }())});

  pagerouter.route('/:language/sale/')
    .get((req, res) =>  {
      (async function query() {
        const pages = await DB.pages.get.headlines(req.params.language);
        const text = await DB.pages.get.text(req.params.language, 5);
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
