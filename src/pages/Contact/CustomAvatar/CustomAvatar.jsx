import React from 'react';
import { Avatar } from 'stream-chat-react';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const CustomAvatar = () => {
    const userInfo = cookies.get('userAccess').split(',');

    return <Avatar image={userInfo[6]} shape="circle" size={32} />;
};

export default CustomAvatar;
