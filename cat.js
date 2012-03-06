#!/usr/bin/env node
var fs = require('fs'),
    twitterlib = require('twitterlib');

fs.readFile(__dirname + '/favs.json', function (e, data) {
  data = JSON.parse(data).reverse();
  data.forEach(function (tweet) {
    console.log("%s -- @%s: %s http://twitter.com/%s/status/%s", tweet.created_at, tweet.user.screen_name, twitterlib.expandLinks(tweet), tweet.user.screen_name, tweet.id_str);
  });
});
