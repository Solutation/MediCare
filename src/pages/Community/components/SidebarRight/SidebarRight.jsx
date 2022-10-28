import React from 'react';
import classNames from 'classnames/bind';

import styles from './SidebarRight.module.scss';
import { UserInfo } from './components/UserInfo';
import { OutstandingPost } from './components/OutstandingPost';

const cx = classNames.bind(styles);

const SidebarRight = () => {
    return (
        <div className={cx('col-3')}>
            <UserInfo />
            <OutstandingPost />
        </div>
    );
};

export default SidebarRight;
