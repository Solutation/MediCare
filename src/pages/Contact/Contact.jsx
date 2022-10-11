import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import classNames from 'classnames/bind';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import 'stream-chat-react/dist/css/index.css';

import styles from './Contact.module.scss';
import './override-library.scss';
import { ChannelContainer, ChannelListContainer } from '~/pages/Contact/components';
import { ChatProvider } from '~/context/ChatContext';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const chatClient = StreamChat.getInstance(apiKey);

const chatToken = cookies.get('chatToken');

chatClient.connectUser({ id: cookies.get('userId') }, chatToken);

const Contact = () => {
    const [loadChatUI, setLoadChatUI] = useState(false);

    return (
        <div className={cx('wrapper')}>
            <ChatProvider>
                <Chat client={chatClient} theme="team light">
                    <ChannelListContainer />
                    <ChannelContainer />
                </Chat>
            </ChatProvider>
        </div>
    );
};

export default Contact;
