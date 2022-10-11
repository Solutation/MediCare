import React, { useState, useRef, useEffect } from 'react';
import {
    Attachment,
    Avatar,
    messageHasReactions,
    MessageOptions,
    MessageRepliesCountButton,
    MessageStatus,
    MessageText,
    MessageTimestamp,
    ReactionSelector,
    SimpleReactionsList,
    useMessageContext
} from 'stream-chat-react';
import classNames from 'classnames/bind';

import WaifuIcon from '~/assets/waifu.jpg';
import styles from './TeamMessage.module.scss';

const cx = classNames.bind(styles);

const TeamMessage = (messageProps) => {
    const { isReactionEnabled, message, reactionSelectorRef, showDetailedReactions } = useMessageContext();

    useEffect(() => {
        const BtnTriggerThread = document.querySelector('.str-chat__message-reply-in-thread-button');
        BtnTriggerThread.onclick = () => {
            const ThreadWrapper = document.querySelector('.team.str-chat .str-chat__thread');
            ThreadWrapper.style.display = 'flex';
        };
    }, []);

    const messageWrapperRef = useRef(null);

    const hasReactions = messageHasReactions(message);
    const hasAttachments = message.attachments && message.attachments.length > 0;

    return (
        <div className="message-wrapper">
            <img src={WaifuIcon} alt="" className={cx('avatar')} />
            <div className="message-wrapper-content">
                <MessageOptions messageWrapperRef={messageWrapperRef} />
                <div className="message-header">
                    <div className="message-header-name">{message.user?.name}</div>
                    <div className="message-header-timestamp">
                        <MessageTimestamp />
                    </div>
                </div>
                {showDetailedReactions && isReactionEnabled && <ReactionSelector ref={reactionSelectorRef} />}
                <MessageText />
                <MessageStatus />
                {hasAttachments && <Attachment attachments={message.attachments} />}
                {hasReactions && !showDetailedReactions && isReactionEnabled && <SimpleReactionsList />}
                <MessageRepliesCountButton reply_count={message.reply_count} />
            </div>
        </div>
    );
};

export default TeamMessage;
