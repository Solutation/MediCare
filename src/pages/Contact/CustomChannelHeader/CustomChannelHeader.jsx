import React from 'react';
import classNames from 'classnames/bind';
import { useChannelStateContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import styles from './CustomChannelHeader.module.scss';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const CustomChannelHeader = () => {
    const userInfo = cookies.get('userAccess').split(',');
    const { channel } = useChannelStateContext();
    const channelNameArray = channel.data.name.split('/');
    const channelName = userInfo[5] === 'Bệnh nhân' ? channelNameArray[1] : channelNameArray[0];
    const memberList = Object.values(channel.state.members);
    const userChannel = memberList.find((member) => member.user_id !== userInfo[1]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_inner_wrapper')}>
                <img src={userChannel.user.avatar} alt="" className={cx('avatar')} />
                <div className={cx('d-flex', 'flex-column')}>
                    <span className={cx('channel_name')}>{channelName}</span>
                    <span className={cx('rating_text')}>Gửi đánh giá</span>
                </div>
            </div>
        </div>
    );
};

export default CustomChannelHeader;
