import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import styles from './CommunityBody.module.scss';
import CharlotteIcon from '~/assets/charlotte.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';
import { faComment, faImage, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Button } from '~/components/Button';
import PostImage from '~/assets/post1.jpg';
import { Reaction } from './components/Reaction';
import { Comment } from './components/Comment';
import { WritingComment } from './components/WritingComment';

const cx = classNames.bind(styles);

const CreatePost = () => {
    const [imageList, setImageList] = useState([]);

    const handleChooseImage = (e) => {
        const file = e.target.files[0];
        const src = URL.createObjectURL(file);
        setImageList((prev) => [...prev, src]);
    };

    const handleCancelImageChoosen = (index) => {
        const arrayLeft = imageList.slice(0, index);
        const arrayRight = imageList.slice(index + 1);
        const result = [...arrayLeft, ...arrayRight];
        setImageList(result);
    };

    return (
        <div className={cx('w-100')}>
            <div className={cx('sending_wrapper')}>
                <h2 className={cx('sending_text')}>Thêm bài viết</h2>
                <div className={cx('form_wrapper')}>
                    <textarea
                        rows="4"
                        cols="60"
                        className={cx('sending_input')}
                        placeholder="Bạn đang nghĩ gì?"
                    ></textarea>
                    <div className={cx('image_inner')}>
                        {imageList.length >= 1 &&
                            imageList.map((image, index) => (
                                <div className={cx('image_item')} key={index}>
                                    <img src={image} alt="" className={cx('image_choosen')} />
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        className={cx('image_close_icon')}
                                        onClick={() => handleCancelImageChoosen(index)}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
                <div className={cx('d-flex', 'align-items-center', 'justify-content-between', 'py-3', 'mt-2')}>
                    <div className={cx('d-flex', 'align-items-center')}>
                        <label htmlFor="fileChoosen">
                            <FontAwesomeIcon icon={faImage} className={cx('upload_icon')} />
                        </label>
                        <input id="fileChoosen" type="file" className={cx('d-none')} onChange={handleChooseImage} />
                        <span className={cx('upload_text')}>Ảnh</span>
                    </div>
                    <Button primary small className={cx('btn_post')}>
                        Đăng
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Post = () => {
    const [tippyInstance, setTippyInstance] = useState();

    const handleScroll = useCallback(() => {
        const x = document.querySelector('#postLoading');
        if (window.innerHeight + document.documentElement.scrollTop >= document.body.offsetHeight) {
            // you're at the bottom of the page
            console.log(1);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // return () => {
    //     window.removeEventListener(onscroll, handleScroll);
    // };

    return (
        <div id="postLoading">
            <div className={cx('post_wrapper')}>
                <div className={cx('p-4', 'd-flex', 'flex-column')}>
                    <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <img src={CharlotteIcon} alt="" className={cx('user_avatar')} />
                            <div className={cx('d-flex', 'flex-column', 'align-items-start')}>
                                <span className={cx('text-black', 'fw-bold', 'mb-2')} style={{ fontSize: '1.6rem' }}>
                                    Lâm Khương Trí
                                </span>
                                <span className={cx('fw-lighter')}>10 mins ago</span>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faEllipsis} className={cx('option_icon')} />
                    </div>
                    <p className={cx('post_content')}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati eos adipisci
                        aspernatur autem. Perspiciatis accusamus, repellendus vel ipsam animi aliquam consequuntur
                        consectetur quod? Tenetur voluptatibus quis ut temporibus iure.
                    </p>
                    <div className={cx('row')}>
                        <div className={cx('col-6', 'mb-4')}>
                            <img src={PostImage} alt="" className={cx('post_image')} />
                        </div>
                        <div className={cx('col-6')}>
                            <img src={PostImage} alt="" className={cx('post_image')} />
                        </div>
                        <div className={cx('col-6')}>
                            <img src={PostImage} alt="" className={cx('post_image')} />
                        </div>
                        <div className={cx('col-6')}>
                            <div className={cx('overllay')}>
                                <img src={PostImage} alt="" className={cx('post_image')} />
                                <span className={cx('addition_text')}>+6</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={cx(
                            'mt-4',
                            'd-flex',
                            'align-items-center',
                            'justify-content-between',
                            'action_wrapper'
                        )}
                    >
                        <div className={cx('d-flex', 'align-items-center', 'p-3', 'h-100')}>
                            <HeadlessTippy
                                interactive={true}
                                delay={[300, 0]}
                                render={(attrs) => (
                                    <div {...attrs}>
                                        <Reaction tippyInstance={tippyInstance} />
                                    </div>
                                )}
                                trigger="mouseenter"
                                onShow={(instance) => {
                                    setTippyInstance(instance);
                                }}
                            >
                                <div className={cx('action_item', 'h-100', 'd-flex', 'align-items-center')}>
                                    <FontAwesomeIcon icon={faThumbsUp} className={cx('action_icon')} />
                                    <span className={cx('action_text')}>Thích</span>
                                </div>
                            </HeadlessTippy>
                            <span className={cx('number')}>1420</span>
                        </div>
                        <div className={cx('d-flex', 'align-items-center', 'p-3', 'h-100')}>
                            <div className={cx('action_item', 'h-100', 'd-flex', 'align-items-center')}>
                                <FontAwesomeIcon icon={faComment} className={cx('action_icon')} />
                                <span className={cx('action_text')}>Bình luận</span>
                            </div>
                            <span className={cx('number')}>1100</span>
                        </div>
                    </div>
                    <Comment />
                    <WritingComment />
                </div>
            </div>
            <div className={cx('post_wrapper')}>
                <div className={cx('p-4', 'd-flex', 'flex-column')}>
                    <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                        <div className={cx('d-flex', 'align-items-center')}>
                            <img src={CharlotteIcon} alt="" className={cx('user_avatar')} />
                            <div className={cx('d-flex', 'flex-column', 'align-items-start')}>
                                <span className={cx('text-black', 'fw-bold', 'mb-2')} style={{ fontSize: '1.6rem' }}>
                                    Lâm Khương Trí
                                </span>
                                <span className={cx('fw-lighter')}>10 mins ago</span>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faEllipsis} className={cx('option_icon')} />
                    </div>
                    <p className={cx('post_content')}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi obcaecati eos adipisci
                        aspernatur autem. Perspiciatis accusamus, repellendus vel ipsam animi aliquam consequuntur
                        consectetur quod? Tenetur voluptatibus quis ut temporibus iure.
                    </p>
                    <div className={cx('row')}>
                        <div className={cx('col-6', 'mb-4')}>
                            <img src={PostImage} alt="" className={cx('post_image')} />
                        </div>
                        <div className={cx('col-6')}>
                            <img src={PostImage} alt="" className={cx('post_image')} />
                        </div>
                        <div className={cx('col-6')}>
                            <img src={PostImage} alt="" className={cx('post_image')} />
                        </div>
                        <div className={cx('col-6')}>
                            <div className={cx('overllay')}>
                                <img src={PostImage} alt="" className={cx('post_image')} />
                                <span className={cx('addition_text')}>+6</span>
                            </div>
                        </div>
                    </div>
                    <div
                        className={cx(
                            'mt-4',
                            'd-flex',
                            'align-items-center',
                            'justify-content-between',
                            'action_wrapper'
                        )}
                    >
                        <div className={cx('d-flex', 'align-items-center', 'p-3', 'h-100')}>
                            <HeadlessTippy
                                interactive={true}
                                delay={[300, 0]}
                                render={(attrs) => (
                                    <div {...attrs}>
                                        <Reaction tippyInstance={tippyInstance} />
                                    </div>
                                )}
                                trigger="mouseenter"
                                onShow={(instance) => {
                                    setTippyInstance(instance);
                                }}
                            >
                                <div className={cx('action_item', 'h-100', 'd-flex', 'align-items-center')}>
                                    <FontAwesomeIcon icon={faThumbsUp} className={cx('action_icon')} />
                                    <span className={cx('action_text')}>Thích</span>
                                </div>
                            </HeadlessTippy>
                            <span className={cx('number')}>1420</span>
                        </div>
                        <div className={cx('d-flex', 'align-items-center', 'p-3', 'h-100')}>
                            <div className={cx('action_item', 'h-100', 'd-flex', 'align-items-center')}>
                                <FontAwesomeIcon icon={faComment} className={cx('action_icon')} />
                                <span className={cx('action_text')}>Bình luận</span>
                            </div>
                            <span className={cx('number')}>1100</span>
                        </div>
                    </div>
                    <Comment />
                    <WritingComment />
                </div>
            </div>
        </div>
    );
};

const CommunityBody = () => {
    return (
        <div className={cx('col-7', 'wrapper', 'offset-2')}>
            <CreatePost />
            <h3 className={cx('text-black', 'fw-bold', 'my-5')}>Bài viết</h3>
            <Post />
        </div>
    );
};

export default CommunityBody;
