# draw-something

### Info 
Project Name: draw-something    Node version: v16.13.0    Npm version: 8.1.0

### Overview 
A ‘Draw & Guess’ game for 2 players.
The first player starts the game by choosing between 3 given words, <br/>
then he will try to draw the word’s meaning.
The second player will see the drawing and will try to guess the word.
Once succeed, he will get to pick a new word, draw it, and so on.

Server was written with Express framework, using Mongo as db.
Client was written with React

### Instructions
#### Running local server
In order to run the project, please clone the repo and then run the following commands:
If you want to run mongo locally : first of all [download and run mongo](https://docs.mongodb.com/v4.2/administration/install-community).

1. go to server folder:
2. run npm install
3. run node index.js

#### Running local client
##### If you want to use the production server go to Utils.js file and set baseUrl = productionUrl
##### If you want to use the local server go to Utils.js file and set baseUrl = localUrl

1. go to client folder:
2. run npm install
3. run npm start

#### Run in production
Since We are using the free version of heroku, you might suffer from a "cold start".
Click on http://draw-guess-app-client.herokuapp.com/ 


