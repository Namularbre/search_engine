# Search engine

A search engine to be used with the crawler from this repository: https://github.com/Namularbre/crawler

## setup

clone this repo and run 
````
npm i
````

You also need a Mongodb database named crawler. This database will be filled with data by the crawler, that will add two collections, one for robots.txt, and one for each web page it fetch.

## run the app

When you have finished the setup, run
````
npm run start
````
or
````
node app.js
````
Note that the second option is better for production because the first one use the experimental --watch parameter that refresh the app when the code change.

## Authors

@Namularbre
