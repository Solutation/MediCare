import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import Cookies from 'universal-cookie';

import styles from './Reaction.module.scss';
import { httpRequest } from '~/utils';

const cx = classNames.bind(styles);

const cookies = new Cookies();

const Reaction = ({ tippyInstance, postId, categoryId, setPostList }) => {
    const [reactionList, setReactionList] = useState([]);
    const userInfo = cookies.get('userAccess').split(',');

    const handleHideTippy = () => {
        tippyInstance.hide();
    };

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { reactionList }
            } = await httpRequest.get(
                '/community/reaction/list',
                { params: { postId } },
                { cancelToken: cancelToken.token }
            );
            setReactionList(reactionList);
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
        //eslint-disable-next-line
    }, []);

    const handleReaction = async (typeReaction) => {
        const userId = userInfo[0];
        const { data } = await httpRequest.get('/community/post/reaction/check', {
            params: { postId, userId, typeReaction }
        });
        if (data.reactionTypeData.length >= 1) {
            await httpRequest.delete('/community/post/reaction/delete', { data: { userId, postId } });
            //prettier-ignore
            const { data: { postList } } = await httpRequest.get('/community/post', { params: { categoryId, userId } });
            //prettier-ignore
            const { data: { reactionList } } = await httpRequest.get('/community/reaction/list', { params: { postId } });
            setReactionList(reactionList);
            setPostList(postList);
        } else {
            await httpRequest.post('/community/post/reaction', null, { params: { userId, postId, typeReaction } });
            //prettier-ignore
            const { data: { postList } } = await httpRequest.get('/community/post', { params: { categoryId, userId } });
            //prettier-ignore
            const { data: { reactionList } } = await httpRequest.get('/community/reaction/list', { params: { postId } });
            setReactionList(reactionList);
            setPostList(postList);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('p-3', 'd-flex', 'align-items-center', 'h-100')}>
                {reactionList.length >= 1 &&
                    reactionList.map((reactionItem) => (
                        <div className={cx('reaction_item_wrapper')} key={reactionItem.id} onClick={handleHideTippy}>
                            <div className={cx('d-flex', 'flex-column', 'align-items-center')}>
                                <img src={reactionItem.image} alt="" onClick={() => handleReaction(reactionItem.id)} />
                                <span className={cx('text-muted')} style={{ fontSize: '1.4rem' }}>
                                    {reactionItem.count}
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Reaction;
