import React from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        // this.renderAction = this.renderAction.bind(this);
    }
    renderAction() {
        return <button className="Track-action" onClick={ this.props.isRemoval ? this.removeTrack : this.addTrack }>{ this.props.isRemoval ? '-' : '+' }</button>;
    }
    addTrack() {
        this.props.onAdd(this.props.track);
    }
    removeTrack() {
        this.props.onRemove(this.props.track);
    }
    render() {
        return (
        <div className="Track">
            <div className="Track-information">
                {this.props.track.name}<br/>
                {this.props.track.artist} | {this.props.track.album}
            </div>
            { this.renderAction() }
        </div>
        )
    }
}