let accessToken;
let clientID = '';
let redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }
        let hasAccess = window.location.href.match(/access_token=([^&]*)/);
        let hasExpiry = window.location.href.match(/expires_in=([^&]*)/);
        if (hasAccess && hasExpiry) {
            console.log(hasAccess, hasExpiry);
            accessToken = hasAccess[1];
            let expiresIn = Number(hasExpiry[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
        return accessToken;
    },

    search(searchTerm) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
            headers: {
                Authorization: `Bearer ${this.getAccessToken()}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            console.log(jsonResponse);
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }))
        })
    },

    async savePlaylist(playlistName, trackURIs) {
        if (!playlistName && !trackURIs) {
            return;
        }
        console.log('saving playlist')
        console.log(playlistName, trackURIs)
        let headers = {
            Authorization: `Bearer ${this.getAccessToken()}`
        }
        let userID = await fetch('https://api.spotify.com/v1/me', {
            headers: headers
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            return jsonResponse.id;
        })
        console.log('USER ID', userID);
        let playlistID = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(
                { 
                    name: playlistName
                }
            )
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            console.log(jsonResponse);
            return jsonResponse.id;
        })
        console.log('PLAYLIST ID', playlistID);
        console.log(trackURIs);
        await fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                uris: trackURIs
            })
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
    }
};



export default Spotify;