# Twitter favs miner

A simple node script that goes off to Twitter's favourite API and collects them all in `favs.json`.

## Install & Usage

    npm install favs
    ./mine.js  # wait for full download
    ./cat.js   # cats out all the tweets

## TODO

* Some useful front end for searching
* Maybe store to a DB instead of a flat file - perhaps to create a service in the future
* Smart extraction of tags and even doc titles by requesting pages linked in tweets
* Make pretty!
