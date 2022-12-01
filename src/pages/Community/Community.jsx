import React from 'react';
import classNames from 'classnames/bind';

import styles from './Community.module.scss';
import { Sidebar } from './components/Sidebar';
import { CommunityBody } from './components/CommunityBody';
import { SidebarRight } from './components/SidebarRight';
import { CommunityProvider } from '~/context/CommunityContext';

const cx = classNames.bind(styles);

const Community = () => {
    return (
        <CommunityProvider>
            <div className={cx('community_bg')}></div>
            <div className={cx('container', 'pt-4', 'community_wrapper')}>
                <div className={cx('row', 'mt-2')}>
                    <Sidebar />
                    <CommunityBody />
                    <SidebarRight />
                </div>
            </div>
        </CommunityProvider>
    );
};

export default Community;
