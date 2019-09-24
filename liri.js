console.log("hi this is working");
//this is dotenv for storing API keys
const result = require('dotenv').config({ path: "C:/users/renee/liri/liri-node-app/liri.env" });
//keys set up
var keys = require("./keys");

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
            inquirer
            .prompt([
              {
                type: "input",
                message: "Which band/artist would you like to search for?",
                name: "bandName"
              },
            {
              type: "input",
              message: "And in which city?",
              name: "city"
            },
            {
              type: "input",
              message: "And in which country?",
              name: "country"
            }
            ]).then(function (response) {
                console.log(response.bandName.toLowerCase());
                //process.argv.slice(2).join('+');
                concert_this(response.bandName.toLowerCase(), response.city.toLowerCase(), response.country.toLowerCase());
              });
          break;
        case "Search a song":
            inquirer
            .prompt([
              {
                type: "input",
                message: "Which song would you like to search for?",
                name: "songName"
              }]).then(function (response) {
                console.log(response.songName.toLowerCase());
                //process.argv.slice(2).join('+');
                spotify_this_song(response.songName.toLowerCase());
              });
          
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
function concert_this(artistName, city, country) {
  console.log("artistName is " + artistName);
  console.log("city " + city);
  console.log("country" + country);
  axios.
  get("https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp").
  then(function (response) {
    console.log("inside the then response function")
    var info = response.data;
    console.log(info);
    var date = response.data[0].datetime;
    date = moment(date).format('MMMM Do YYYY, h:mm a');
    console.log("I found an event on " + date);
    var lineup = response.data[0].lineup;
    console.log("The lineup is: " + lineup);
    var venueCity = response.data[0].venue.city;
    var venueCountry = response.data[0].venue.country;
    console.log("The event will be held in: " + venueCity + ", " + venueCountry);
    //console.log(response.data[0]);
  });
  
}
//spotify-this-song
//print the following info: Artist(s), song name, preview of link to song, album, if no song provided default is the sign from ace of base
function spotify_this_song(song) {
  //spotify set up
  var Spotify = require('node-spotify-api');
  var spotify = new Spotify(keys.spotify);

  spotify
    .search({ type: 'track', query: song })
    .then(function (response) {
      //var artist = response.track;
      //console.log(artist);
      console.log("Artist(s): ")
      var album = response.tracks.items[0].album.name;
      console.log("Album: " + album);
      var song_name = response.tracks.items[0].name;
      console.log("Song: " + song_name);
      var externalLink = response.tracks.items[0].album.external_urls.spotify;
      console.log("Link to the album on spotify: " + externalLink);
      runProgram();
    })
    .catch(function (err) {
      console.log(err);
    });
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