import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useChannelStateContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import styles from './CustomChannelHeader.module.scss';
import { RatingConsultant } from '~/components/RatingConsultant';
import { Alert } from '~/components/Alert';
import SadIcon from '~/assets/sad.png';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const CustomChannelHeader = () => {
    const userInfo = cookies.get('userAccess').split(',');
    const [popupRating, setPopupRating] = useState(false);
    const [alertPopup, setAlertPopup] = useState(false);
    const { channel } = useChannelStateContext();
    const channelNameArray = channel.data.name.split('/');
    const channelName = userInfo[5] === 'Bệnh nhân' ? channelNameArray[1] : channelNameArray[0];
    const memberList = Object.values(channel.state.members);
    const userChannel = memberList.find((member) => member.user_id !== userInfo[1]);
    const checkMessage = channel.state.messages[channel.state.messages.length - 1];

    const handleRating = () => {
        if (checkMessage === undefined) {
            setAlertPopup(true);
            return;
        }
        setPopupRating(true);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header_inner_wrapper')}>
                <img src={userChannel.user.avatar} alt="" className={cx('avatar')} />
                <div className={cx('d-flex', 'flex-column')}>
                    <span className={cx('channel_name')}>{channelName}</span>
                    {userInfo[5] === 'Bệnh nhân' && (
                        <span className={cx('rating_text')} onClick={handleRating}>
                            Gửi đánh giá
                        </span>
                    )}
                </div>
            </div>
            {popupRating && (
                <RatingConsultant
                    setPopupRating={setPopupRating}
                    image={userChannel.user.avatar}
                    patientId={userInfo[0]}
                    consultantId={userChannel.user_id.split('@')[0]}
                />
            )}
            {alertPopup && (
                <Alert
                    iconImage={SadIcon}
                    content="Bạn chưa thực hiện tin nhắn nào với chuyên gia này để đánh giá"
                    setAlertPopup={setAlertPopup}
                />
            )}
        </div>
    );
};

export default CustomChannelHeader;
