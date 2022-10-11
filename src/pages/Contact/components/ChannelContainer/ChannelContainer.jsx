import React, { useState, useEffect } from 'react';
import { Channel, useChatContext, MessageSimple, Avatar } from 'stream-chat-react';
import classNames from 'classnames/bind';

import { ChannelInner, CreateChannel, EditChannel, TeamMessage } from '../ChannelContainer/components';
import { ChatContext } from '~/context/ChatContext';
import styles from './ChannelContainer.module.scss';
import { CustomThread } from './components/Thread';

const cx = classNames.bind(styles);

const ChannelContainer = () => {
    const { isCreating, setIsCreating, isEditing, setIsEditing, createType } = useChatContext(ChatContext);
    const BtnTriggerThread = document.querySelector('.str-chat__message-reply-in-thread-button');
    const ThreadWrapper = document.querySelector('.team.str-chat .str-chat__thread');
    //console.log(BtnTriggerThread);

    if (isCreating) {
        return (
            <div className={cx('channel__container')}>
                <CreateChannel createType={createType} setIsCreating={isCreating} />
            </div>
        );
    }

    if (isEditing) {
        return (
            <div className={cx('channel__container')}>
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        );
    }

    const EmptyState = () => {
        <div className={cx('channel-empty__container')}>
            <p className={cx('channel-empty__first')}>This is the beginning of your chat message</p>
            <p className={cx('channel-empty__second')}>Send messages, attachments, links, emojis, and more!</p>
        </div>;
    };

    return (
        <div className={cx('channel__container')}>
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, index) => <TeamMessage {...messageProps} />}
                ThreadHeader={CustomThread}
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
};

export default ChannelContainer;
