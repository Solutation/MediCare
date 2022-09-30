import React from 'react';
import classNames from 'classnames/bind';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import styles from './Contact.module.scss';
import { ChannelContainer, ChannelListContainer } from '~/pages/Contact/components';

const cx = classNames.bind(styles);

const apiKey = '1234';

const client = StreamChat.getInstance(apiKey);

const authToken = false;

const Contact = () => {
    return (
        <div className={cx('wrapper')}>
            <Chat client={client} theme="team light">
                <ChannelListContainer />
                <ChannelContainer />
            </Chat>
        </div>
    );
};

export default Contact;
