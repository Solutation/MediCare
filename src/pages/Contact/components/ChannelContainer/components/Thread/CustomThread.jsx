import React, { useRef, useEffect, useContext } from 'react';
import { Thread, Avatar, ThreadHeader, useChannelStateContext } from 'stream-chat-react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './CustomThread.module.scss';
import CloseIcon from '~/assets/close.png';

const cx = classNames.bind(styles);

const MainInput = (props) => {
    // render main `MessageInput` UI component here
};

const MainMessage = (props) => {
    // render main `Message` UI component here
};

const ThreadMessage = (props) => {
    // render thread `Message` UI component here
    return <input className={cx('form-control', 'fs-3', 'rounded')} placeholder="Nhập tin  của bạn" />;
};
const CustomThread = () => {
    const { channel } = useChannelStateContext();

    const handleCloseThread = () => {
        const ThreadWrapper = document.querySelector('.team.str-chat .str-chat__thread');
        if (ThreadWrapper) {
            ThreadWrapper.style.display = 'none';
        }
    };

    return (
        <>
            <div className={cx('d-flex', 'justify-content-between', 'align-items-center', 'w-100', 'py-2', 'mt-1')}>
                <span className={cx('fw-bold', 'fs-3')}>#{channel.data.name}</span>
                <img
                    src={CloseIcon}
                    alt=""
                    className={cx('px-3')}
                    style={{ cursor: 'pointer' }}
                    onClick={handleCloseThread}
                />
            </div>
            <hr />
        </>
    );
};

export default CustomThread;
