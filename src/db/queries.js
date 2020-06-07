// => node modules
const express = require('express');
const debug = require('debug')('app:queries');
const path = require('path');

// => db connection
const sql = require('../db/config');

// => functions
const SC = require('../js/functions');

module.exports = {
    buttons: {
        get: {
            text: async function(language, id) {
                const result = await sql.query('SELECT text FROM tblButtonText WHERE id = ? AND language = ?', [id, language]);
                return result;
            }
        }
    },
    food: {
        courses: {
            get: async function(language, group) {
                group == 'all' ? (result = await sql.query('SELECT * FROM tblFood WHERE language = ?', [language])) : (result = await sql.query('SELECT * FROM tblFood WHERE `language` = ? AND `group` = ?', [language, group]));
                return result;
            }
        },
        groups: {
            get: async function(language) {
                const result = await sql.query('SELECT * FROM tblFoodGroups WHERE language = ?', [language]);
                return result;
            }
        }
    },
    languages: {
        published: async function() {
            const result = await sql.query('SELECT language FROM tblPages where published = 1 GROUP BY language');
            return result;
        }
    },
    pages: {
        get: {
            headlines: async function(language) {
                const result = await sql.query('SELECT path, text, language FROM tblPages WHERE language = ? AND published = 1', [language]);
                return result;
            },
            text: async function(language, page) {
                const result = await sql.query('SELECT text FROM tblPageText WHERE language = ? AND page = ?', [language, page])
                return result;
            }
        }
    },
    tools: {
        get: async function(language) {
            const tools = await sql.query('SELECT text, priceDay, priceWeek FROM tblTools WHERE language = ?', [language]);
            return tools;
        }
    }
}