// => node modules
const express = require('express');
const debug = require('debug')('app:data');
const fs = require('fs');

// => db connection
const sql = require('../db/config');
const db = require('../db/queries');

// => functions
const SC = require('../js/functions');

// => APIs
//const api = require('../api/requests');

const local = module.exports = {
    buttons: {
        get: {
            text: async function(language, id) {
                const result = await db.buttons.get.text(language, id);
                return result[0].text;
            }
        }
    },
    languages: {
        published: async function() {
            const l = []
            const result = await db.languages.published();
            for (var i in result) {
                l.push(result[i]['language'])
            }
            return l;
        }
    },
    pages: {
        get: {
            headlines: async function(language) {
                var p = []
                const result = await db.pages.get.headlines(language);
                for (var i in result) {
                    x = {}
                    x['path'] = result[i]['path']
                    x['text'] = result[i]['text']
                    x['language'] = result[i]['language']
                    p.push(x)
                }
                return p;
            },
            pictures: async function(page) {
                var arr = []
                fs.readdirSync('public/img/upload/' + page + '/').forEach(file => {
                    if (file.split('.').pop() === 'jpg' || file.split('.').pop() === 'png') {
                        arr.push(file)
                    }
                });
                return arr;
            },
            text: async function(language, page) {
                const result = await db.pages.get.text(language, page);
                for (var i in result) {
                    return result[i].text
                }
            }
        }
    },
    tools: {
        get: async function(language) {
            const result = db.tools.get(language);
            return result;
        }
    }
}