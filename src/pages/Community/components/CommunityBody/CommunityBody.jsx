import React, { useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import Cookies from 'universal-cookie';

import styles from './CommunityBody.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faComment, faImage, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { Button } from '~/components/Button';
import { Reaction } from './components/Reaction';
import { Comment } from './components/Comment';
import { WritingComment } from './components/WritingComment';
import { CommunityContext } from '~/context/CommunityContext';
import { httpRequest, handleDateResponse, checkFileExtension } from '~/utils';
import axios from 'axios';
import { Alert } from '~/components/Alert';
import SadIcon from '~/assets/sad.png';
import { uploadImage, getImageUrl } from '~/utils/fileUtils';

const cx = classNames.bind(styles);

const cookies = new Cookies();

let imageResult = [];

const CreatePost = () => {
    const [imageListUI, setImageListUI] = useState([]);
    const [imageList, setImageList] = useState([]);
    const [errorPostMessage, setErrorPostMessage] = useState('');
    const [alertPopup, setAlertPopup] = useState(false);
    const userInfo = cookies.get('userAccess').split(',');
    const { categoryId, setPostList } = useContext(CommunityContext);
    const [textValue, setTextValue] = useState();

    const handleChooseImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!checkFileExtension(file.name.split('.')[1])) {
                setErrorPostMessage('Chỉ được chọn ảnh với định dạng jpg, png và jpeg');
                setAlertPopup(true);
                return;
            }
        }
        const src = URL.createObjectURL(file);
        setImageListUI((prev) => [...prev, src]);
        setImageList((prev) => [...prev, file]);
    };

    const handleCancelImageChoosen = (index) => {
        const arrayLeftUI = imageListUI.slice(0, index);
        const arrayRightUI = imageListUI.slice(index + 1);
        const arrayLeft = imageList.slice(0, index);
        const arrayRight = imageList.slice(index + 1);
        const resultUI = [...arrayLeftUI, ...arrayRightUI];
        const result = [...arrayLeft, ...arrayRight];
        setImageListUI(resultUI);
        setImageList(result);
    };

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        if (imageList.length >= 1) {
            imageList.forEach(async (imageItem, index) => {
                try {
                    const imageRef = await uploadImage(imageItem, 'image-ui');
                    const url = await getImageUrl(imageRef);
                    await imageResult.push({ name: url });
                    if (index === imageList.length - 1) {
                        const formData = {
                            userId: userInfo[0],
                            categoryId,
                            content: textValue,
                            imageListResult: imageResult
                        };
                        try {
                            await httpRequest.post('/community/post/add', formData);
                            //prettier-ignore
                            const { data: { postList } } = await httpRequest.get('/community/post', { params: { categoryId, userId: userInfo[0] } });
                            setImageList([]);
                            setImageListUI([]);
                            setTextValue(''.trim());
                            setPostList(postList);
                        } catch ({ response }) {
                            setImageList([]);
                            setImageListUI([]);
                            setTextValue(''.trim());
                            setErrorPostMessage(response.data.message);
                            setAlertPopup(true);
                        } finally {
                            imageResult = [];
                        }
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        } else {
            const formData = { userId: userInfo[0], categoryId, content: textValue };
            try {
                await httpRequest.post('/community/post/add', formData);
                //prettier-ignore
                const { data: { postList } } = await httpRequest.get('/community/post', { params: { categoryId, userId: userInfo[0] } });
                setTextValue(''.trim());
                setPostList(postList);
            } catch ({ response }) {
                setTextValue(''.trim());
                setErrorPostMessage(response.data.message);
                setAlertPopup(true);
            }
        }
    };

    return (
        <>
            <form>
                <div className={cx('w-100')}>
                    <div className={cx('sending_wrapper')}>
                        <h2 className={cx('sending_text')}>Thêm bài viết</h2>
                        <div className={cx('form_wrapper')}>
                            <textarea
                                rows="4"
                                cols="60"
                                className={cx('sending_input')}
                                placeholder="Bạn đang nghĩ gì?"
                                onInput={(e) => setTextValue(e.target.value)}
                                value={textValue}
                            ></textarea>
                            <div className={cx('image_inner')}>
                                {imageListUI.length >= 1 &&
                                    imageListUI.map((image, index) => (
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
                                <input
                                    id="fileChoosen"
                                    type="file"
                                    className={cx('d-none')}
                                    onChange={handleChooseImage}
                                />
                                <span className={cx('upload_text')}>Ảnh</span>
                            </div>
                            <Button primary small className={cx('btn_post')} onClick={handleSubmitPost}>
                                Đăng
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            {alertPopup && <Alert iconImage={SadIcon} content={errorPostMessage} setAlertPopup={setAlertPopup} />}
        </>
    );
};

const Post = () => {
    const userInfo = cookies.get('userAccess').split(',');
    const [tippyInstance, setTippyInstance] = useState();
    // const [postList, setPostList] = useState([]);
    const { categoryId, postList, setPostList, loading } = useContext(CommunityContext);
    const [reaction, setReaction] = useState([]);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: { reactionList }
            } = await httpRequest.get('/community/reaction/list/all', { cancelToken: cancelToken.token });
            setReaction(reactionList);
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
    }, []);

    useEffect(() => {
        if (categoryId) {
            const cancelToken = axios.CancelToken.source();
            const fetchAPI = async () => {
                try {
                    const {
                        data: { postList }
                    } = await httpRequest.get(
                        '/community/post',
                        { params: { categoryId, userId: userInfo[0] } },
                        { cancelToken: cancelToken.token }
                    );
                    setPostList(postList);
                } catch (err) {
                    console.log(err);
                }
            };
            fetchAPI();

            return () => {
                cancelToken.cancel();
            };
        }
        // eslint-disable-next-line
    }, [categoryId, userInfo]);

    return (
        <div id="postLoading">
            {loading ? (
                <span>Đang đăng</span>
            ) : (
                <>
                    {postList.length >= 1 &&
                        reaction.length >= 1 &&
                        postList.map(
                            (
                                { post, imagePost, commentPost, userAccessReaction, reactionCount, commentCount },
                                index
                            ) => (
                                <div className={cx('post_wrapper')} key={index}>
                                    <div className={cx('p-4', 'd-flex', 'flex-column')}>
                                        <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                                            <div className={cx('d-flex', 'align-items-center')}>
                                                <img src={post.avatar} alt="" className={cx('user_avatar')} />
                                                <div className={cx('d-flex', 'flex-column', 'align-items-start')}>
                                                    <span
                                                        className={cx('text-black', 'fw-bold', 'mb-2')}
                                                        style={{ fontSize: '1.6rem' }}
                                                    >
                                                        {`${post.first_name} ${post.last_name}`}
                                                    </span>
                                                    <span className={cx('fw-lighter')}>
                                                        {handleDateResponse(post.created_date)}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* <FontAwesomeIcon icon={faEllipsis} className={cx('option_icon')} /> */}
                                        </div>
                                        <p className={cx('post_content')}>{post.content}</p>
                                        <div className={cx('row')}>
                                            {imagePost.length > 1
                                                ? imagePost.map((imageItem) => (
                                                      <div className={cx('col-6', 'mb-4')} key={imageItem.id}>
                                                          <img
                                                              src={imageItem.image_post}
                                                              alt=""
                                                              className={cx('post_image')}
                                                          />
                                                      </div>
                                                  ))
                                                : imagePost.map((imageItem) => (
                                                      <div className={cx('col-12', 'mb-4')} key={imageItem.id}>
                                                          <img
                                                              src={imageItem.image_post}
                                                              alt=""
                                                              className={cx('post_image')}
                                                          />
                                                      </div>
                                                  ))}
                                            {/* <div className={cx('col-6')}>
                                    <div className={cx('overllay')}>
                                        <img src={PostImage} alt="" className={cx('post_image')} />
                                        <span className={cx('addition_text')}>+6</span>
                                    </div>
                                </div> */}
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
                                                            <Reaction
                                                                tippyInstance={tippyInstance}
                                                                postId={post.id}
                                                                setPostList={setPostList}
                                                                categoryId={categoryId}
                                                            />
                                                        </div>
                                                    )}
                                                    trigger="mouseenter"
                                                    onShow={(instance) => {
                                                        setTippyInstance(instance);
                                                    }}
                                                >
                                                    <div
                                                        className={cx(
                                                            'action_item',
                                                            'h-100',
                                                            'd-flex',
                                                            'align-items-center'
                                                        )}
                                                    >
                                                        {userAccessReaction ? (
                                                            <img
                                                                src={reaction[userAccessReaction.type - 1].image}
                                                                alt=""
                                                                className={cx('action_icon')}
                                                            />
                                                        ) : (
                                                            <FontAwesomeIcon
                                                                icon={faThumbsUp}
                                                                className={cx('action_icon')}
                                                            />
                                                        )}
                                                        <span className={cx('action_text')}>Thích</span>
                                                    </div>
                                                </HeadlessTippy>
                                                <span className={cx('number')}>{reactionCount}</span>
                                            </div>
                                            <div className={cx('d-flex', 'align-items-center', 'p-3', 'h-100')}>
                                                <div
                                                    className={cx(
                                                        'action_item',
                                                        'h-100',
                                                        'd-flex',
                                                        'align-items-center'
                                                    )}
                                                >
                                                    <FontAwesomeIcon icon={faComment} className={cx('action_icon')} />
                                                    <span className={cx('action_text')}>Bình luận</span>
                                                </div>
                                                <span className={cx('number')}>{commentCount}</span>
                                            </div>
                                        </div>
                                        <Comment commentList={commentPost} />
                                        <WritingComment
                                            postId={post.id}
                                            categoryId={categoryId}
                                            setPostList={setPostList}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                </>
            )}
        </div>
    );
};

const CommunityBody = () => {
    return (
        <div className={cx('col-7', 'wrapper', 'offset-2', 'ps-5')}>
            <CreatePost />
            <h3 className={cx('text-black', 'fw-bold', 'my-5')}>Bài viết</h3>
            <Post />
        </div>
    );
};

export default CommunityBody;
