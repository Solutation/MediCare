import React, { useEffect, useState, useContext, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useChatContext } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';

import styles from './CustomChannelPreview.module.scss';
import { ChannelSearchContext } from '~/context/ChannelSearchContext';
import { removeVietnameseTones } from '~/utils';

const cx = classNames.bind(styles);

const api_key = process.env.REACT_APP_STREAM_API_KEY;

const api_secret = process.env.REACT_APP_STREAM_API_SECRET;

const cookies = new Cookies();

let checkValueSearch = 0;

// eslint-disable-next-line
const CustomChannelPreview = () => {
    const [channelList, setChannelList] = useState([]);
    const { setActiveChannel } = useChatContext();
    const { channelSearchValue } = useContext(ChannelSearchContext);
    const userInfo = cookies.get('userAccess').split(',');

    useEffect(() => {
        const getChannel = async () => {
            const userContactId = userInfo[1];
            const chatClient = StreamChat.getInstance(api_key, api_secret);
            const filters = { type: 'messaging', members: { $in: [userContactId] } };
            const sort = [{ last_message_at: -1 }];
            const channels = await chatClient.queryChannels(filters, sort, {
                state: true
            });
            setChannelList(channels);
        };
        getChannel();
        // eslint-disable-next-line
    }, []);

    const handleSelect = useCallback((channel) => {
        setActiveChannel(channel);
        // eslint-disable-next-line
    }, []);

    const ChannelItem = useCallback(
        ({ channel }) => {
            const channelNameArray = channel.data.name.split('/');
            const channelName = userInfo[5] === 'Bệnh nhân' ? channelNameArray[1] : channelNameArray[0];
            const memberList = Object.values(channel.state.members);
            const userChannel = memberList.find((member) => member.user_id !== userInfo[1]);

            return (
                <div className={cx('preview_list_wrapper')} key={channel.data.id}>
                    <div className={cx('preview_list_item')} onClick={() => handleSelect(channel)}>
                        <img src={userChannel.user.avatar} alt="" className={cx('preview_avatar')} />
                        <div className={cx('d-flex', 'flex-column', 'align-items-start')}>
                            <h2 className={cx('text-white', 'fw-bold', 'px-4', 'fs-3', 'mt-2')}>{channelName}</h2>
                            <GetMessageText channel={channel} />
                        </div>
                    </div>
                </div>
            );
        },
        // eslint-disable-next-line
        []
    );

    const EmptyChannel = useCallback(() => {
        console.log(1);
        return <span className={cx('text-white', 'fs-2', 'p-3', 'fw-bold')}>Không tìm thấy kênh...</span>;
    }, []);

    const GetMessageText = ({ channel }) => {
        let message = '';
        const checkMessage = channel.state.messages[channel.state.messages.length - 1];
        if (checkMessage === undefined) message = 'Bạn chưa có tin nhắn nào';
        else message = checkMessage.text;
        return <span className={cx('preview_message')}>{message}</span>;
    };

    return (
        <>
            {channelList.length >= 1 &&
                // eslint-disable-next-line
                channelList.map((channel, index) => {
                    if (channelSearchValue !== '') {
                        if (
                            removeVietnameseTones(channel.data.name.toLowerCase()).indexOf(
                                removeVietnameseTones(channelSearchValue).toLowerCase()
                            ) !== -1
                        ) {
                            checkValueSearch = 1;
                            return <ChannelItem channel={channel} key={index} />;
                        }
                        if (index === channelList.length - 1) {
                            if (checkValueSearch === 0) return <EmptyChannel key={index} />;
                            checkValueSearch = 0;
                        }
                    } else {
                        return <ChannelItem channel={channel} key={index} />;
                    }
                })}
        </>
    );
};

export default CustomChannelPreview;
