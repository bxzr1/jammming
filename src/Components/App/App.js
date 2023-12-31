// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

// function App() {
export class App extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
        this.state = {
            searchResults: [],
            playlistName: '',
            playlistTracks: [
            ]
        };
    }
    addTrack(track) {
        let currentPlaylist = this.state.playlistTracks.slice();
        if (currentPlaylist.find(tr => tr.id === track.id)) {
            return;
        }
        currentPlaylist.push(track);
        this.setState({playlistTracks: currentPlaylist});
    }
    removeTrack(track) {
        let currentPlaylist = this.state.playlistTracks.slice();
        currentPlaylist.splice(currentPlaylist.findIndex(tr => tr.id === track.id), 1)
        this.setState({playlistTracks: currentPlaylist});
        // this.state.playlistTracks.splice(this.state.playlistTracks.findIndex(tr => tr.id === track.id), 1);
    }
    updatePlaylistName(name) {
        this.setState({ playlistName: name});
    }
    savePlaylist() {
        let trackURIs = [];
        this.state.playlistTracks.slice().forEach(tr => trackURIs.push(tr.uri));
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        console.log('saved playlist i think')
    }
    search(searchTerm) {
        console.log("Search term: ",searchTerm);
        Spotify.search(searchTerm)
            .then(response => {
                this.setState({searchResults: response})
            })
    }
    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                    <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
                    <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist}/>
                    </div>
                </div>
            </div>
        );
    }
}

// export default App;
