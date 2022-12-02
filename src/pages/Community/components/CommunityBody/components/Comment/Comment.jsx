import React from 'react';
import classNames from 'classnames/bind';

import styles from './Comment.module.scss';

const cx = classNames.bind(styles);

const Comment = ({ commentList }) => {
    // const [count, setCount] = useState(commentSize);
    // const [noMoreComment, setNoMoreComment] = useState(false);

    // useLayoutEffect(() => {
    //     setCommentCountResult((prev) => [...prev, commentCount]);
    // }, [commentCount]);

    // useEffect(() => {
    //     if (commentSize >= commentCount) {
    //         setCommentListResult(commentList.slice(0));
    //         setNoMoreComment(true);
    //         return;
    //     }
    //     if (count < commentCount) {
    //         setCommentListResult(commentList.slice(0, count));
    //         return;
    //     }
    //     if (count === commentCount) {
    //         setCommentListResult(commentList.slice(0, count));
    //         setNoMoreComment(true);
    //     }
    // }, [count]);

    // const handleReadMoreComment = () => {
    //     setCount((prev) => prev + commentSize);
    // };

    return (
        <>
            <div>
                <>
                    {commentList.length >= 1 &&
                        commentList.map((commentItem) => (
                            <div className={cx('d-flex', 'align-items-center', 'mt-3', 'mb-3')} key={commentItem.id}>
                                <img src={commentItem.avatar} alt="" className={cx('avatar')} />
                                <div
                                    className={cx(
                                        'd-flex',
                                        'flex-column',
                                        'h-100',
                                        'comment_content_wrapper',
                                        'mt-3',
                                        'flex-wrap'
                                    )}
                                >
                                    <span
                                        className={cx('text-black', 'fw-bold', 'fs-4')}
                                    >{`${commentItem.first_name} ${commentItem.last_name}`}</span>
                                    <p className={cx('comment_content')}>{commentItem.content}</p>
                                </div>
                            </div>
                        ))}
                </>
                {/* <h2 className={cx('view_more_comment_text', { hide: noMoreComment })} onClick={handleReadMoreComment}>
                    Xem thêm bình luận
                </h2> */}
            </div>
        </>
    );
};

export default Comment;
