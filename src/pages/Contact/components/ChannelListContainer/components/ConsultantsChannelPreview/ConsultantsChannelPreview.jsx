import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import classNames from 'classnames/bind';

import styles from './ConsultantsChannelPreview.module.scss';

const cx = classNames.bind(styles);

const ConsultantsChannelPreview = ({ channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => <p>{channel?.data?.name || channel?.data?.id}</p>;

    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(
            ({ user }) => user.id !== client.userID,
        );

        return (
            <div className={cx('preview_wrapper')}>
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                />
                <p>{members[0]?.user?.fullName}</p>
            </div>
        );
    };

    return (
        <div
            className={cx('channel_preview_wrapper', {
                selected: channel?.id === activeChannel?.id,
            })}
            onClick={() => {
                console.log(channel);
            }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    );
};

export default ConsultantsChannelPreview;
