console.log("hi this is working");
//this is dotenv for storing API keys
const result = require('dotenv').config({ path: "C:/users/renee/liri/liri-node-app/liri.env" });
//keys set up
var keys = require("./keys");
//spotify set up
var Spotify = require('node-spotify-api');
console.log(keys.spotify);
var spotify1 = new Spotify(keys.spotify);
console.log("this is spotify" + spotify1);
//moment set up
var moment = require('moment');
moment().format();
//axios set up
const axios = require('axios');

var inquirer = require("inquirer");

console.log("I'm Liri, your personal assistant. Nice to meet you!")

runProgram();

function runProgram() {
      // Create a "Prompt" with for user interface.
      inquirer
        .prompt([
          {
            type: "list",
            message: "What would you like to do?",
            choices: ["Search for concerts", "Search a song", "Search a movie", "Mysterious Random Choice: who knows what you'll get!", "I'm done, quit please"],
            name: "choice"
          }
        ]).then(function (response) {
          console.log(response.username);
          console.log(response.choice);
          switch (response.choice) {
            case "Search for concerts":
              concert_this();
              break;
            case "Search a song":
              spotify_this_song();
              break;
            case "Search a movie":
              inquirer
                .prompt([
                  {
                    type: "input",
                    message: "Which movie would you like to search?",
                    name: "movieName"
                  }]).then(function (response) {
                    console.log(response.movieName.toLowerCase());
                    //process.argv.slice(2).join('+');
                    movie_this(response.movieName.toLowerCase());
                  });
              break;
            case "Mysterious Random Choice: who knows what you'll get!":
              do_what_it_says();
              break;
            case "I'm done, quit please":
              quitLiri();
              break;
          }
        })
    }
//concert-this
//search bands in town API for artist and print out name of venue, venue location & date of event
function concert_this() {
      //code
    }
//spotify-this-song
//print the following info: Artist(s), song name, preview of link to song, album, if no song provided default is the sign from ace of base
function spotify_this_song() {
      //code
    }
//movie-this
//print out the following: Title of movie, year, Imdb rating, rotten tomatoes rating, country, language, plot, actors; if nothing entered the default is Mr. Nobody

function movie_this(movieName) {
      // Then run a request with axios to the OMDB API with the movie specified
      var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

      // This line is just to help us debug against the actual URL.
      console.log(queryUrl);

      axios.get(queryUrl).then(
        function (response) {
          // var newResponse = response.JSONStringify();
          var database = response.data;
          console.log(database);
          var title = response.data.Title;
          var year = response.data.Year;
          var imdb = response.data.imdbRating;
          var rotten = response.data.Ratings[1].Value;
          var country = response.data.Country;
          var language = response.data.Language;
          var plot = response.data.Plot;
          var actors = response.data.Actors;
          var website = response.data.Website;
          console.log("~Here is the movie information you requested~");
          console.log("Title: " + title);
          console.log("Year: " + year);
          console.log("IMDB Rating: " + imdb);
          console.log("Rotten Tomatoes Rating: " + rotten);
          console.log("Country: " + country);
          console.log("Language: " + language);
          console.log("Plot: " + plot);
          console.log("Actors: " + actors);
          console.log("Website: " + website);
          runProgram();
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("---------------Data---------------");
            console.log(error.response.data);
            console.log("---------------Status---------------");
            console.log(error.response.status);
            console.log("---------------Status---------------");
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an object that comes back with details pertaining to the error that occurred.
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    }
//do-what-it-says
//run "spotify-this-song for "I want it that way" in random.txt
function do_what_it_says() {
      //code
    }
  
function quitLiri() {
  //code
  console.log("OK, see you next time! Bye!");
}