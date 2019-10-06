# liri-node-app

This app prompts the user to make a selection between find a concert, search a song, search a movie, random choice or quit. Welcome screen: ![screen shot of start](https://github.com/reneelpetit/liri-node-app/blob/master/Liri%20first%20prompt.JPG)

If the user selects find a concert they are prompted to type in a band/artist. Then an API call is made to BandsInTown to get concert info on the band/artist the user entered. The next upcoming concert info is then printed to the screen. Find concert: ![screen shot of find concert](https://github.com/reneelpetit/liri-node-app/blob/master/Liri%20concert%20function.JPG)

If the user selects search a song they are prompted to enter in the song name.  Then an API call is made to Spotify to get info on the specified song.  The song name, artist/band name, and spotify link are printed to the screen. Find song: ![screen shot of find song](https://github.com/reneelpetit/liri-node-app/blob/master/liri%20search%20a%20song.JPG)

If the user selects search a movie they are prompted to enter a movie name. Then an API call to OMDB is made to get the info on the movie.  The movie title, actors, plot, language and country are printed to the screen. ![screen shot of find movie](https://github.com/reneelpetit/liri-node-app/blob/master/liri%20movie%20function.JPG)

If the user selects random, the program goes into the random.txt file and executes whatever command is in that file. ![screen shot of random](https://github.com/reneelpetit/liri-node-app/blob/master/liri%20random%20choice%20function.JPG)

These choice continually appear for the user until the select quit and then the app ends. ![screen shot of quit](https://github.com/reneelpetit/liri-node-app/blob/master/liri%20quit%20function.JPG)
