This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Description

A learning project to practice React and making requests with third-party APIs. The end goal is an application that allows users to search the Spotify library, create a custom playlist, then save it to their Spotify account.



https://github.com/bxzr1/jammming/assets/19394780/33bb4259-8f78-4b81-af28-3263c1a80aa3



## To Run This Project

In the project directory, you can run:

### `npm start`

Which runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

Requires a logged-in Spotify account to use.

This project also requires a ClientId key for the Spotify API, available with a free Spotify account and after registering your application as a developer.

Note: As suggested by the project instructions, I used the Implicit Grant Flow to set up a user’s account and make requests. The implicit grant flow returns a user’s token in the URL, which is then extracted into the app. After they expire, they are cleared from the URL.

## Project Development Requirements
✓ Build a web app using React<br>
✓ Version control your application with Git and host the repository on GitHub<br>
✓ Integrate with Spotify or another API<br>
✓ Deploy your application<br>
✓ Write a README (using Markdown) that documents your project<br>

## Technologies Used
HTML/CSS<br>
JavaScript<br>
React<br>
HTTP Requests and Responses<br>
Authentication<br>

## Services Used
Spotify

## Project Features
✓ Users can search for songs by song title<br>
✓ Users can see information about each song like title, artist, and album for songs they queried<br>
✓ Users can export their custom playlist to their personal Spotify account<br>

## Future Work
* Include preview samples for each track
* Only display songs not currently present in the playlist in the search results
* Add a loading screen while playlist is saving
* Update the access token logic to expire at exactly the right time, instead of setting expiration from when the user initiates their next search
* After user redirect on login, restoring the search term from before the redirect
* Provide a way to fetch and see all your existing playlists
