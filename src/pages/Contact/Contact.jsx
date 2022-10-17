import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import { StreamChat } from 'stream-chat';
import {
    Chat,
    Channel,
    ChannelList,
    MessageList,
    MessageInput,
    Thread,
    Window,
    Avatar,
    MessageStatus,
    MessageSimple
} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import '@stream-io/stream-chat-css/dist/css/index.css';

import styles from './Contact.module.scss';
import './override-library.scss';
import { CustomChannelList } from './ChannelList/CustomChannelList';
import { CustomChannelPreview } from './ChannelList/CustomChannelPreview';
import { ChannelSearchProvider } from '~/context/ChannelSearchContext';
import WaifuIcon from '~/assets/waifu.jpg';
import ImageUploadIcon from '~/assets/upload.png';
import EmojiIcon from '~/assets/emoji.png';
import { CustomThreadHeader } from './ThreadHeader';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const chatToken = cookies.get('chatToken');

const CustomAvatar = () => {
    return <Avatar image={WaifuIcon} shape="circle" size={20} />;
};

const CustomMessageStatus = (props) => {
    return <MessageStatus Avatar={CustomAvatar} />;
};

const CustomFileUploadIcon = (props) => {
    return <img src={ImageUploadIcon} alt="" sizes={20} />;
};

const CustomEmojiIcon = (props) => {
    return <img src={EmojiIcon} alt="" />;
};

const handleHoverUser = (e) => {
    const x = document.querySelector(
        '.str-chat__message--me>.str-chat-angular__avatar-host .str-chat__avatar, .str-chat__message--me>.str-chat__avatar'
    );
    x.title = '';
};

let flag = 0;

const Contact = () => {
    const [client, setClient] = useState();
    const [check, setCheck] = useState(false);

    useEffect(() => {
        const init = async () => {
            if (flag === 0) {
                flag = 1;
                const user_id = cookies.get('userId');
                const chatClient = StreamChat.getInstance(apiKey);
                await chatClient.connectUser({ id: user_id }, chatToken);
                setClient(chatClient);
                setCheck(!check);
            }
        };
        init();
    }, []);

    return (
        <div className={cx('pt-2')}>
            {client && (
                <Chat client={client}>
                    <ChannelSearchProvider>
                        <ChannelList
                            List={CustomChannelList}
                            Preview={(passProps) => <CustomChannelPreview {...passProps} />}
                        />
                        <Channel
                            FileUploadIcon={CustomFileUploadIcon}
                            MessageStatus={(props) => <CustomMessageStatus {...props} />}
                            EmojiIcon={CustomEmojiIcon}
                            ThreadHeader={CustomThreadHeader}
                        >
                            <Window>
                                <MessageList
                                    messageActions={['reply', 'edit', 'delete', 'react']}
                                    closeReactionSelectorOnClick={true}
                                    hideDeletedMessages={true}
                                    disableDateSeparator={true}
                                    onlySenderCanEdit={true}
                                    Message={() => <MessageSimple onUserHover={handleHoverUser} />}
                                />
                                <MessageInput />
                            </Window>
                            <Thread />
                        </Channel>
                    </ChannelSearchProvider>
                </Chat>
            )}
        </div>
    );
};

export default Contact;
