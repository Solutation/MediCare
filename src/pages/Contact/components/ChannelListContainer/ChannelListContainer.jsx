import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import classNames from 'classnames/bind';

import { ChannelSearch, ConsultantsChannel, ConsultantsChannelPreview } from '../ChannelListContainer/components';
import styles from './ChannelListContainer.module.scss';
import HospitalIcon from '~/assets/contact-hospital.png';
import LogoutIcon from '~/assets/contact-logout.png';

const cx = classNames.bind(styles);

const SideBar = () => (
    <div className={cx('sidebar_wrapper')}>
        <div className={cx('icon_wrapper')}>
            <img className={cx('sidebar_icon')} src={HospitalIcon} alt="" />
        </div>
        <div className={cx('icon_wrapper', 'mt-3')}>
            <img className={cx('sidebar_icon')} src={LogoutIcon} alt="" />
        </div>
    </div>
);

const ChannelHeader = () => (
    <div className={cx('w-100')}>
        <h2 className={cx('text-white', 'text-left', 'p-4', 'fw-bold')}>Medicare Chat</h2>
    </div>
);

const ChannelListContainer = () => {
    return (
        <>
            <SideBar />
            <div className={cx('channel_wrapper')}>
                <ChannelHeader />
                <ChannelSearch />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => <ConsultantsChannel {...listProps} type="team" />}
                    Preview={(previewProps) => <ConsultantsChannelPreview {...previewProps} type="team" />}
                />
                <ChannelList
                    filters={{}}
                    channelRenderFilterFn={() => {}}
                    List={(listProps) => <ConsultantsChannel {...listProps} type="messaging" />}
                    Preview={(previewProps) => <ConsultantsChannelPreview {...previewProps} type="messaging" />}
                />
            </div>
        </>
    );
};

export default ChannelListContainer;
