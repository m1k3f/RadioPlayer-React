import React, { Component } from 'react';
import StationHomepageLink from './controls/StationHomepageLink'
import StationTitle from './controls/StationTitle'
import DeleteStationButton from './controls/DeleteStationButton'

export default class PlaylistStationItem extends Component {

    render() {
        return (
            <div>
                <StationHomepageLink />
                <StationTitle />
                <DeleteStationButton />
            </div>
        );
    }
}