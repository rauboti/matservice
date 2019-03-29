// => node modules
const express = require('express');
const debug = require('debug')('app:data');

// => db connection
const sql = require('../js/db');

// => functions
//const SC = require('../js/functions');

const local = module.exports = {
  get: {
    contactInfo: async function() {
      var info = {};
      const result = await sql.query('SELECT type, value FROM tblContact')
      for (var i in result) {
        info[result[i].type] = result[i].value;
      }
      return info;
    },
    food: async function(id) {
      var result;
      var food = {}
      var foodgroups = await local.get.foodGroups();
      result = await sql.query('SELECT `group`, `dish`, `p1`, `p2`, `p3`, `p4` FROM tblFood WHERE `page` = ?', [id])
      for (var i in result) {
        result[i].group ? group = foodgroups[result[i].group] : group = 'ungrouped'

        !food[group] && (food[group] = {}) //Set if not excists
        !food['prices'] && (food['prices'] = 0) //Set if not excists
        !food[group]['dishes'] && (food[group]['dishes'] = []) //Set if not excists

        var set = {}
        set['dish'] = result[i].dish;
        if (result[i].p1) {
          set['p1'] = result[i].p1 + ',-';
          if (food['prices'] < 1) { food['prices'] = 1; }
        }
        if (result[i].p2) {
          set['p2'] = result[i].p2 + ',-';
          if (food['prices'] < 2) { food['prices'] = 2; }
        }
        if (result[i].p3) {
          set['p3'] = result[i].p3 + ',-';
          if (food['prices'] < 3) { food['prices'] = 3; }
        }
        if (result[i].p4) {
          set['p4'] = result[i].p4 + ',-';
          if (food['prices'] < 4) { food['prices'] = 4; }
        }
        food[group]['dishes'].push(set)
      }
      result = await sql.query('SELECT fg.name, fgc.comment from tblFoodGroupComments fgc JOIN tblFoodGroups fg ON fg.id = fgc.id')
      for (var i in result) {
        if (food[result[i].name]) {food[result[i].name]['comment'] = result[i].comment;}
      }
      result = await sql.query('SELECT * FROM tblFoodPriceCategories WHERE `page` = ?', [id])
      if (result.length > 0) {
        food['priceCategories'] = [];
        if (result[0][1]) {food['priceCategories'].push(result[0][1]);}
        if (result[0][2]) {food['priceCategories'].push(result[0][2]);}
        if (result[0][3]) {food['priceCategories'].push(result[0][3]);}
        if (result[0][4]) {food['priceCategories'].push(result[0][4]);}
      }
      return food;
    },
    foodDetails: async function(id) {
      //var result;
      var details = {}
      details['pagetext'] = await local.get.pageText('Mat', id)
      return details;
    },
    foodGroups: async function() {
      foodgroups = {}
      result = await sql.query('SELECT * FROM tblFoodGroups')
      for (var i in result) {
        foodgroups[result[i].id] = result[i].name
      }
      return foodgroups;
    },
    pages: async function() {
      var pages = {}
      var mp = await sql.query('SELECT name, path FROM tblPages')
      var sp = await sql.query('SELECT * FROM tblSubpages')
      for (var p in mp) {
        pages[mp[p].name] = {}
        pages[mp[p].name]['path'] = mp[p].path
      }
      for (var p in sp) {
        !pages[sp[p].parent]['sub'] && (pages[sp[p].parent]['sub'] = [])
        var set = {}
        set['id'] = sp[p].id;
        set['name'] = sp[p].name;
        pages[sp[p].parent]['sub'].push(set)
      }
      return pages;
    },
    pageText: async function(page, id) {
      const result = await sql.query('SELECT `text` FROM tblPagetexts WHERE `page` = ? AND `subpage` = ?', [page, id])
      return result[0].text;
    },
    premiseDetails: async function(id) {
      var result;
      var details = {}
      result = await sql.query('SELECT guests, infolink FROM tblPremiseDetails WHERE premise = ?', [id])
      details['guests'] = result[0].guests
      details['infolink'] = result[0].infolink
      details['pagetext'] = await local.get.pageText('Lokaler', id)
      details['services'] = await local.get.premiseServices(id)
      return details;
    },
    premiseServices: async function(id) {
      var result = await sql.query('SELECT service, price FROM tblPremiseServices WHERE premise = ?', [id])
      for (var i in result) {
        result[i].price += ',-'
      }
      return result;
    },
    services: async function() {
      var result = await sql.query('SELECT service, price_hourly, price_fixed FROM tblServices');
      for (var i in result) {
        if (result[i].price_hourly === null) {
          result[i].price_hourly = '-'
        } else if (result[i].price_hourly === 0) {
          result[i].price_hourly = 'Etter avtale'
        } else {
          result[i].price_hourly += ',-'
        }
        if (result[i].price_fixed === null) {
          result[i].price_fixed = '-'
        } else if (result[i].price_fixed === 0) {
          result[i].price_fixed = 'Etter avtale'
        } else {
          result[i].price_fixed += ',-'
        }
      }
      return result;
    },
    subpages: async function(main) {
      result = await sql.query('SELECT `id`, `name` FROM tblSubpages WHERE `parent` = ?', [main])
      return result;
    }
  },
//  getUniqueID: async function(table) {
//    var id = SC.createID();
//    var excists = await sql.query('SELECT * from ?? WHERE id = ?', [table, id]);
//    while (excists.length !== 0) {
//      id = SC.createID();
//      excists = await sql.query('SELECT * from ?? WHERE id = ?', [table, id]);
//    }
//    return id;
//  }
}
