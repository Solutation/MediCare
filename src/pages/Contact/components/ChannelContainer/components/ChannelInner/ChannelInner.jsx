import React, { useState, useContext } from 'react';
import {
    MessageList,
    MessageInput,
    Thread,
    Window,
    useChannelActionContext,
    Avatar,
    useChannelStateContext,
    useChatContext,
    ChatAutoComplete,
    EmojiIconLarge,
    EmojiPicker,
    Tooltip,
    SendButton,
    useMessageInputContext,
    useTranslationContext
} from 'stream-chat-react';
import classNames from 'classnames/bind';

import { ChatContext } from '~/context/ChatContext';
import styles from './ChannelInner.module.scss';
import ImageUploadIcon from '~/assets/picture.png';

const cx = classNames.bind(styles);

export const GiphyContext = React.createContext({});

const ThreadInput = (props) => {
    // render thread `MessageInput` UI component here
    return <input className={cx('form-control', 'fs-3', 'rounded')} placeholder="Nhập tin nhắn của bạn" />;
};

const CustomMessageInput = () => {
    const { t } = useTranslationContext();

    const { closeEmojiPicker, emojiPickerIsOpen, handleEmojiKeyDown, handleSubmit, openEmojiPicker, imageUploads } =
        useMessageInputContext();

    return (
        <div className="str-chat__input-flat str-chat__input-flat--send-button-active">
            <div className="str-chat__input-flat-wrapper">
                <div className="str-chat__input-flat--textarea-wrapper">
                    <ChatAutoComplete />
                    <div className="str-chat__emojiselect-wrapper">
                        <span
                            className="str-chat__input-flat-emojiselect"
                            onClick={emojiPickerIsOpen ? closeEmojiPicker : openEmojiPicker}
                            onKeyDown={handleEmojiKeyDown}
                            role="button"
                            tabIndex={0}
                        >
                            <EmojiIconLarge />
                        </span>
                    </div>
                    <EmojiPicker />
                </div>
                <div className="str-chat__fileupload-wrapper" data-testid="fileinput">
                    <div className="str-chat__tooltip">Attach files</div>
                    <div className="rfu-file-upload-button">
                        <label>
                            <input aria-label="File input" type="file" className="rfu-file-input" multiple="" />
                            <span className="str-chat__input-flat-fileupload">
                                <img src={ImageUploadIcon} alt="" />
                            </span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ChannelInner = () => {
    const [giphyState, setGiphyState] = useState(false);
    const { sendMessage } = useChannelActionContext();
    const { setIsEditing } = useContext(ChatContext);

    const overrideSubmitHandler = (message) => {
        let updatedMessage = {
            attachments: message.attachments,
            mentioned_users: message.mentioned_users,
            parent_id: message.parent?.id,
            parent: message.parent,
            text: message.text
        };

        if (giphyState) {
            updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
        }

        if (sendMessage) {
            sendMessage(updatedMessage);
            setGiphyState(false);
        }
    };

    return (
        <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <Window>
                    <TeamChannelHeader setIsEditing={setIsEditing} />
                    <MessageList />
                    <MessageInput overrideSubmitHandler={overrideSubmitHandler} Input={CustomMessageInput} />
                </Window>
                <Thread />
            </div>
        </GiphyContext.Provider>
    );
};

const TeamChannelHeader = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();

    const MessagingHeader = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
        const additionalMembers = members.length - 3;

        if (channel.type === 'messaging') {
            return (
                <div className={cx('team-channel-header__name-wrapper')}>
                    {members.map(({ user }, i) => (
                        <div key={i} className={cx('team-channel-header__name-multi')}>
                            <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                            <p className={cx('team-channel-header__name user')}>{user.fullName || user.id}</p>
                        </div>
                    ))}

                    {additionalMembers > 0 && (
                        <p className={cx('team-channel-header__name user')}>and {additionalMembers} more</p>
                    )}
                </div>
            );
        }

        return (
            <div className={cx('team-channel-header__channel-wrapper')}>
                <p className={cx('team-channel-header__name')}># {channel.data.name}</p>
                <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}></span>
            </div>
        );
    };

    const getWatcherText = (watchers) => {
        if (!watchers) return 'No users online';
        if (watchers === 1) return '1 user online';
        return `${watchers} users online`;
    };

    return (
        <div className={cx('team-channel-header__container')}>
            <MessagingHeader />
            <div className={cx('team-channel-header__right')}>
                <p className={cx('team-channel-header__right-text')}>{getWatcherText(watcher_count)}</p>
            </div>
        </div>
    );
};

export default ChannelInner;
