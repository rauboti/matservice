// => node modules
const express = require('express');
const debug = require('debug')('app:queries');
const path = require('path');

// => db connection
const sql = require('../db/config');

// => functions
const SC = require('../js/functions');

module.exports = {
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
    }
}