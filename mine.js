#!/usr/bin/env node
var twitterlib = require('twitterlib'), // npm install twitterlib
    fs = require('fs'),
    filename = __dirname + '/favs.json';

fs.readFile(filename, 'utf8', function (e, tweetsStr) {
  var options = {},
      offset = 1,
      glue = '';
  if (!e) {
    // lazy - in case the json favs is screwed
    try {
      var last = JSON.parse(tweetsStr).reverse().pop();
      options.since = last.id_str;
      console.log('getting tweets since ' + last.created_at);
      offset = tweetsStr.length;
      glue = ',';
    } catch (e) {
      tweetsStr = '[]';
      fs.writeFileSync(filename, tweetsStr);
      console.log('exception: written empty file');
      console.log(e);
    }
  } else {
    tweetsStr = '[]';
    fs.writeFileSync(filename, tweetsStr);
    console.log('written empty file');    
  }
  
  var data = [];
  twitterlib.favs('rem', options, function (tweets, options) {
    console.log('collected ' + tweets.length + ' tweets');
    data = data.concat(tweets);
    if (tweets.length) {
      console.log('getting more.');
      twitterlib.next();
    } else {
      if (data.length) {
        console.log('writing to favs.json');
        fs.writeFile(filename, JSON.stringify(data).slice(0, -1) + glue + tweetsStr.substring(1), function (err) {
          if (!err) {
            console.log('done');
          } else {
            console.log(data);
          }        
        });  
      } else {
        console.log('no new tweets to save');
      }      
      // fs.createWriteStream(filename, {
      //   flags: 'a', 
      //   encoding: 'utf8', 
      //   mode: 666,
      //   start: offset
      // }).write(glue + JSON.stringify(data).substring(1), function (err) {

      // });
    }
  });

});
