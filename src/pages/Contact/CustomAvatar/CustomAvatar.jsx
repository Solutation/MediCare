import React from 'react';
import { Avatar, useChannelStateContext } from 'stream-chat-react';

const CustomAvatar = ({ name }) => {
    const { channel } = useChannelStateContext();
    const memberList = Object.values(channel.state.members);
    const userChannel = memberList.find((member) => member.user_id === name);

    return <Avatar image={userChannel.user.avatar} shape="circle" size={32} />;
};

export default CustomAvatar;
