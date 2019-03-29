// => node modules
const express = require('express');
const debug = require('debug')('app:routes');
const device = require('express-device');

const pagerouter = express.Router();

const DB = require('../js/data');

function router() {
  pagerouter.route('/')
    .get((req, res) =>  {
      (async function query() {
        const menu = await DB.get.pages();
        const pagetext = await DB.get.pageText('Forside', 0);
        const contact = await DB.get.contactInfo();
        var conf = {device: req.device.type.toLowerCase(), contact: contact, menu: menu, pagetext: pagetext, selectedPage: 'Forside'}
        res.render('home', {conf})
      }())
    });

  pagerouter.route('/food')
    .get((req, res) => {
      (async function query() {
        const menu = await DB.get.pages();
        const contact = await DB.get.contactInfo();
        const subpages = await DB.get.subpages('Mat');
        var conf = {device: req.device.type.toLowerCase(), contact: contact, menu: menu, subpages: subpages, landingpage: 'food', selectedPage: 'Mat'}
        res.render('landingpage', {conf})
      }())
    });

  pagerouter.route('/food/:id')
    .get((req, res) => {
      (async function query() {
        const menu = await DB.get.pages();
        const contact = await DB.get.contactInfo();
        const details = await DB.get.foodDetails(req.params.id);
        const food = await DB.get.food(req.params.id);
        var conf = {device: req.device.type.toLowerCase(), contact: contact, menu: menu, food: food, details: details, selectedPage: 'Mat'}
        res.render('foodgroup', {conf})
      }())
    });

  pagerouter.route('/premises')
    .get((req, res) => {
      (async function query() {
        const menu = await DB.get.pages();
        const contact = await DB.get.contactInfo();
        const subpages = await DB.get.subpages('Lokaler');
        var conf = {device: req.device.type.toLowerCase(), contact: contact, menu: menu, subpages: subpages, landingpage: 'premises', selectedPage: 'Lokaler'}
        res.render('landingpage', {conf})
      }())
    });

  pagerouter.route('/premises/:id')
    .get((req, res) => {
      (async function query() {
        const menu = await DB.get.pages();
        const contact = await DB.get.contactInfo();
        const details = await DB.get.premiseDetails(req.params.id);
        var conf = {device: req.device.type.toLowerCase(), contact: contact, menu: menu, details: details, selectedPage: 'Lokaler'}
        res.render('premise', {conf})
      }())
    });

  pagerouter.route('/services')
    .get((req, res) => {
      (async function query() {
        const menu = await DB.get.pages();
        const pagetext = await DB.get.pageText('Tjenester', 0);
        const contact = await DB.get.contactInfo();
        const services = await DB.get.services();
        var conf = {device: req.device.type.toLowerCase(), contact: contact, menu: menu, pagetext: pagetext, services: services, selectedPage: 'Andre tjenester'}
        res.render('services', {conf})
      }())
    })

  return pagerouter;
}

module.exports = router;
