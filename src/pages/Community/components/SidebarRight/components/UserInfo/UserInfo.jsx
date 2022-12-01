import React, { useState, useContext, useLayoutEffect } from 'react';
import classNames from 'classnames/bind';
import Cookies from 'universal-cookie';
import axios from 'axios';

import styles from './UserInfo.module.scss';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { CommunityContext } from '~/context/CommunityContext';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const UserInfo = () => {
    const userInfo = cookies.get('userAccess').split(',');
    const [totalPost, setTotalPost] = useState();
    const [totalReaction, setTotalReaction] = useState();
    const { setPostList, setCategoryId } = useContext(CommunityContext);

    useLayoutEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { totalPost, totalReaction }
            } = await httpRequest.get(
                '/community/post/reaction/count',
                { params: { userId: userInfo[0] } },
                { cancelToken: cancelToken.token }
            );
            setTotalPost(totalPost);
            setTotalReaction(totalReaction);
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
    }, [userInfo]);

    const handleViewPost = async () => {
        const {
            data: { postList }
        } = await httpRequest.get('/community/post/list', { params: { userId: userInfo[0] } });
        setPostList(postList);
        setCategoryId(0);
    };

    return (
        <>
            <div className={cx('user_wrapper')}>
                <div className={cx('d-flex', 'flex-column', 'user_inner')}>
                    <div className={cx('d-flex', 'align-items-center')}>
                        <img src={userInfo[6]} alt="" className={cx('avatar')} />
                        <div className={cx('d-flex', 'flex-column', 'h-100', 'mt-5')}>
                            <span className={cx('text-black', 'fw-bold', 'mb-2')} style={{ fontSize: '1.6rem' }}>
                                {userInfo[4]}
                            </span>
                            <span className={cx('text-muted')}>{userInfo[3]}</span>
                        </div>
                    </div>
                    <div
                        className={cx('d-flex', 'align-items-center', 'p-4', 'ms-3', 'justify-content-around', 'mt-1')}
                    >
                        <div className={cx('d-flex', 'flex-column', 'analysis_wrapper', 'text-center')}>
                            <span className={cx('number', 'text-black', 'mb-1', 'fw-bold')}>
                                {totalPost && totalPost}
                            </span>
                            <span className={cx('action_text')}>Bài đăng</span>
                        </div>
                        <div
                            className={cx('d-flex', 'flex-column', 'analysis_wrapper', 'text-center')}
                            style={{ border: 'unset', paddingRight: 'unset' }}
                        >
                            <span className={cx('number', 'text-black', 'mb-1', 'fw-bold')}>
                                {totalReaction && totalReaction}
                            </span>
                            <span className={cx('action_text')}>Lượt thích</span>
                        </div>
                    </div>
                    <div className={cx('mx-auto', 'mt-4')} onClick={handleViewPost}>
                        <Button primary rounded>
                            Xem bài viết
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserInfo;
