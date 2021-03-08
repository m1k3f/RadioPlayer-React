import React, { Component } from 'react';
import { IoMdRadio } from 'react-icons/io';

import styles from './NavBarControls.module.css';

export default class HeaderTitle extends Component {
    render() {
        let iconStyle = {
            color: 'black',
            width: '40px',
            height: '40px'
        };

        return(
            <div className={styles.headerLeft}>
                <IoMdRadio style={iconStyle} />
            </div>
        );
    }
}