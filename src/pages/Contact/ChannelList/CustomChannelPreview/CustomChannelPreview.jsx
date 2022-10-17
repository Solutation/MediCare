import React, { useEffect, useState, useContext, memo, useMemo, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useChatContext, useMessageContext } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import Cookies from 'universal-cookie';

import styles from './CustomChannelPreview.module.scss';
import ChibiIcon from '~/assets/chibi.jpg';
import { ChannelSearchContext } from '~/context/ChannelSearchContext';
import { removeVietnameseTones } from '~/utils';

const cx = classNames.bind(styles);

const api_key = process.env.REACT_APP_STREAM_API_KEY;

const api_secret = process.env.REACT_APP_STREAM_API_SECRET;

const cookies = new Cookies();

let flag = 0;

// eslint-disable-next-line
const CustomChannelPreview = ({ latestMessage }) => {
    const [channelList, setChannelList] = useState([]);
    const { setActiveChannel } = useChatContext();
    const { channelSearchValue } = useContext(ChannelSearchContext);

    useEffect(() => {
        const getChannel = async () => {
            const user_id = cookies.get('userId');
            const chatClient = StreamChat.getInstance(api_key, api_secret);
            const filters = { type: 'messaging', members: { $in: [user_id] } };
            const sort = [{ last_message_at: -1 }];
            const channels = await chatClient.queryChannels(filters, sort, {
                state: true
            });
            setChannelList(channels);
        };
        getChannel();
    }, []);

    const ChannelItem = useCallback(
        ({ channel }) => (
            <div className={cx('preview_list_wrapper')} key={channel.data.id}>
                <div className={cx('preview_list_item')} onClick={() => handleSelect(channel)}>
                    <img src={ChibiIcon} alt="" className={cx('preview_avatar')} />
                    <div className={cx('d-flex', 'flex-column', 'align-items-start')}>
                        <h2 className={cx('text-white', 'fw-bold', 'px-4', 'fs-3', 'mt-2')}>{channel.data.name}</h2>
                        <GetMessageText channel={channel} />
                    </div>
                </div>
            </div>
        ),
        []
    );

    const EmptyChannel = useCallback(() => {
        console.log(1);
        return <span className={cx('text-white', 'fs-2', 'p-3', 'fw-bold')}>Không tìm thấy kênh...</span>;
    }, []);

    const handleSelect = useCallback((channel) => {
        console.log(2);
        setActiveChannel(channel);
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
                channelList.map((channel, index) => {
                    if (channelSearchValue !== '') {
                        if (
                            removeVietnameseTones(channel.data.name.toLowerCase()).indexOf(
                                removeVietnameseTones(channelSearchValue).toLowerCase()
                            ) !== -1
                        ) {
                            flag = 1;
                            return <ChannelItem channel={channel} key={index} />;
                        }
                        if (index == channelList.length - 1) {
                            if (flag === 0) return <EmptyChannel key={index} />;
                            flag = 0;
                        }
                    } else {
                        return <ChannelItem channel={channel} key={index} />;
                    }
                })}
        </>
    );
};

export default CustomChannelPreview;
