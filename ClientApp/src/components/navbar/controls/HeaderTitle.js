import React, { Component } from 'react';
import { IoMdRadio } from 'react-icons/io';

import styles from './NavBarControls.module.css';

export default class HeaderTitle extends Component {
    render() {
        let iconStyle = {
            color: 'black',
            width: '45px',
            height: '45px'
        };

        return(
            <div className={styles.headerLeft}>
                <IoMdRadio style={iconStyle} />
            </div>
        );
    }
}