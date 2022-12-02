import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Cookies from 'universal-cookie';

import styles from './WritingComment.module.scss';
import { httpRequest } from '~/utils';
import { Alert } from '~/components/Alert';
import SadIcon from '~/assets/sad.png';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const WritingComment = ({ postId, categoryId, setPostList }) => {
    const [message, setMessage] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [alertPopup, setAlertPopup] = useState(false);
    const userInfo = cookies.get('userAccess').split(',');

    const handleSendMessage = async (e) => {
        if (e.keyCode === 13) {
            try {
                await httpRequest.post('/community/post/comment/add', null, {
                    params: { userId: userInfo[0], postId, categoryId, content: message }
                });
                //prettier-ignore
                const { data: { postList } } = await httpRequest.get('/community/post', { params: { categoryId, userId: userInfo[0] } });
                setPostList(postList);
                setMessage(''.trim());
            } catch ({ response }) {
                setErrorMessage(response.data.message);
                setMessage(''.trim());
                setAlertPopup(true);
            }
        }
    };

    return (
        <>
            <div className={cx('d-flex', 'align-items-center', 'mt-3')}>
                <img src={userInfo[6]} alt="" className={cx('avatar')} />
                <div className={cx('w-100')} type="submit">
                    <textarea
                        rows="3"
                        placeholder="Viết bình luận"
                        className={cx('sending_input')}
                        onKeyDown={handleSendMessage}
                        onInput={(e) => setMessage(e.target.value)}
                        value={message}
                    ></textarea>
                </div>
            </div>
            {alertPopup && <Alert iconImage={SadIcon} content={errorMessage} setAlertPopup={setAlertPopup} />}
        </>
    );
};

export default WritingComment;
