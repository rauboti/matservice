// => node modules
const express = require('express');
const debug = require('debug')('app:data');
const path = require('path');
const fs = require('fs');

module.exports = {
  get: {
    image : {
      frontpage: async function() {
        var filepath;
        debug('Enter the sandman')


        fs.readdirSync(path.join(__dirname, '../../public/img/upload/frontpage'), function(err, files) {
          if (err) {
            return debug('Unable to scan directory')
          }
          files.forEach(function(file) {
            filepath = '/img/upload/frontpage/' + file.toString()
          });
          debug(filepath)
          return filepath;
        });


      }
    }
  }
}
