import React, { useState, useEffect } from 'react';
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
    MessageSimple
} from 'stream-chat-react';
import Cookies from 'universal-cookie';
import '@stream-io/stream-chat-css/dist/css/index.css';

import styles from './Contact.module.scss';
import './override-library.scss';
import { CustomChannelList } from './ChannelList/CustomChannelList';
import { CustomChannelPreview } from './ChannelList/CustomChannelPreview';
import { ChannelSearchProvider } from '~/context/ChannelSearchContext';
import ImageUploadIcon from '~/assets/upload.png';
import EmojiIcon from '~/assets/emoji.png';
import { CustomThreadHeader } from './ThreadHeader';
import { CustomChannelHeader } from './CustomChannelHeader';
import { CustomAvatar } from './CustomAvatar';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

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

const Contact = () => {
    const [client, setClient] = useState();
    const userInfo = cookies.get('userAccess').split(',');
    const chatToken = userInfo[2];

    useEffect(() => {
        const chatClient = StreamChat.getInstance(apiKey);
        const init = async () => {
            const userContactId = userInfo[1];
            await chatClient.connectUser({ id: userContactId }, chatToken);
            setClient(chatClient);
        };
        init();
        //eslint-disable-next-line

        return async () => {
            await chatClient.disconnectUser();
        };
        //eslint-disable-next-line
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
                            Avatar={CustomAvatar}
                            EmojiIcon={CustomEmojiIcon}
                            ThreadHeader={CustomThreadHeader}
                        >
                            <Window>
                                <CustomChannelHeader />
                                <MessageList
                                    messageActions={['edit', 'delete', 'react']}
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
