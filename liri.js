
var Twitter = require("twitter");

var fs = require("fs");

var request = require("request");

var spotify = require("spotify");

var keys = require("./keys.js");

var argInput = process.argv.slice(3).join(' ');

function doWhatItSays() {
    // This block of code will read from the "movies.txt" file.
    // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
    // The code will store the contents of the reading inside the variable "data"
    fs.readFile("random.txt", "utf8", function (error, data) {

        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        var dammit = dataArr[1];

        dammitWTF = dammit.toString().replace(/["]+/g, '');
        
        process.argv[2] = dataArr[0];
        process.argv[3] = dammitWTF;

        console.log(argInput);
        

        spotifyThis();



    });
}

//function for requesting from omDB
function movieThis() {

    if (process.argv[3] === undefined) {
        argInput = "Mr Nobody";
    }

    //add underscores for rotten tomatoes link
    var movieNameLink = argInput.replace(" ", "_");
    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + argInput + "&y=&plot=short&r=json";

    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // display info from the site
            console.log("\n-----------------\n");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Released: " + JSON.parse(body).Year);
            console.log("imdbRating: " + JSON.parse(body).imdbRating);
            console.log("Country:" + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Rotten Tomatoes Url: https://www.rottentomatoes.com/m/" + movieNameLink);
            console.log("\n-----------------\n");

        }
    });

}

function spotifyThis() {

    if (process.argv[3] === undefined) {
        argInput = 'the sign';
    }


    spotify.search({ type: 'track', query: argInput }, function (err, data) {
        if (err) {
            console.log('Error occurred: ' + err);
            return;
        } else {

            if (process.argv[3] === undefined) {
                console.log("\n-----------------\n");
                console.log("Artist: " + data.tracks.items[2].artists[0].name);
                console.log("Song: " + data.tracks.items[2].name);
                console.log("Album: " + data.tracks.items[2].album.name);
                console.log("Preview: " + data.tracks.items[2].preview_url);
                console.log("\n-----------------\n");

            } else {
                console.log("\n-----------------\n");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("Song: " + data.tracks.items[0].name);
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("Preview: " + data.tracks.items[0].preview_url);
                console.log("\n-----------------\n");
            }


        }
    });
}

function myTweets() {
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_secret,
        access_token_secret: keys.twitterKeys.access_token_secret
    });

    var params = { screen_name: "ForensicSmiles" };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            console.log(tweets);

        } else {
            console.log(error);
        }
    });

}



function switchCase() {

    switch (process.argv[2]) {
        case "movie-this":
            movieThis();
            break;
        case "spotify-this-song":
            spotifyThis();
            break;
        case "my-tweets":
            myTweets();
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
        default:
            console.log("\n-----------------\n");
            console.log("! PLEASE ENTER A VALID COMMAND !");
            console.log("\n-----------------\n");

    }

}

switchCase();