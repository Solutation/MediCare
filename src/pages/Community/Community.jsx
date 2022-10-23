import React from 'react';
import classNames from 'classnames/bind';

import styles from './Community.module.scss';
import { Sidebar } from './components/Sidebar';

const cx = classNames.bind(styles);

const Community = () => {
    return (
        <div className={cx('container', 'pt-4')}>
            <div className={cx('row')}>
                <Sidebar />
            </div>
        </div>
    );
};

export default Community;
