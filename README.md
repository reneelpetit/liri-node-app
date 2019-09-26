# liri-node-app
This app prompts the user to make a selection between find a concert, search a song, search a movie, random choice or quit.  

If the user selects find a concert they are prompted to type in a band/artist. Then an API call is made to BandsInTown to get concert info on the band/artist the user entered. The next upcoming concert info is then printed to the screen.

If the user selects search a song they are prompted to enter in the song name.  Then an API call is made to Spotify to get info on the specified song.  The song name, artist/band name, and spotify link are printed to the screen.

If the user selects search a movie they are prompted to enter a movie name. Then an API call to OMDB is made to get the info on the movie.  The movie title, actors, plot, language and country are printed to the screen.

If the user selects random, the program goes into the random.txt file and executes whatever command is in that file.

These choice continually appear for the user until the select quit and then the app ends.
