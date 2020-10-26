import React, { Component } from 'react';
import PlaylistCount from './controls/PlaylistCount'
import PlaylistClearButton from './controls/PlaylistClearButton'

export default class PlaylistHeader extends Component {

    render() {
        return (
            <div>
                <PlaylistCount />
                <PlaylistClearButton />
            </div>
        );
    }
}