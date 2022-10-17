import React, { useEffect } from 'react';
import { Avatar, ChannelStateContext, useChannelStateContext } from 'stream-chat-react';
import classNames from 'classnames/bind';

import styles from './CustomThreadHeader.module.scss';
import CloseIcon from '~/assets/close.png';

const cx = classNames.bind(styles);

const CustomThreadHeader = ({ closeThread }) => {
    const { channel } = useChannelStateContext();

    useEffect(() => {
        const threadInput = document.querySelector('.str-chat__small-message-input textarea');
        threadInput.style.height = '54px';
    }, []);

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('text-black', 'fw-bold', 'fs-3')}>{channel.data.name}</h2>
            <div onClick={(event) => closeThread(event)} className={cx('close-button')}>
                <img src={CloseIcon} alt="" />
            </div>
        </div>
    );
};

export default CustomThreadHeader;
