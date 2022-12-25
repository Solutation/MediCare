import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './CommunityManagement.module.scss';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { getSerialList, getTotalPageList } from '~/utils/PaginationUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);

const CommunityManagement = () => {
    const [postList, setPostList] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [serial, setSerial] = useState();
    const [deletePostAlert, setDeletePostAlert] = useState(false);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: {
                    totalPages,
                    data: { postList }
                }
            } = await httpRequest.get(
                '/admin/post/info',
                { params: { pageSize: 5, pageNumber } },
                { cancelToken: cancelToken.token }
            );
            setPostList(postList);
            setTotalPages(getTotalPageList(totalPages));
            setSerial(getSerialList(pageNumber, 5));
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, [pageNumber, checkUpdate]);

    const handleClickPagination = (pageIndex) => {
        setPageNumber(pageIndex);
    };

    const handlePreviousClick = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleNextClick = () => {
        setPageNumber(pageNumber + 1);
    };

    const handleDeletePost = async (postId) => {
        if (!window.confirm('Bạn có chắc muốn xóa bài viết này không?')) return false;
        else {
            await httpRequest.delete(`/admin/post/delete/${postId}`);
            setCheckUpdate(!checkUpdate);
            setDeletePostAlert(true);
        }
    };

    return (
        <>
            {postList && totalPages && serial && (
                <>
                    <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                        <h2 className={cx('fw-bold')}>Quản lý cộng đồng</h2>
                        <hr />
                        {/* <div className={cx('search_wrapper')}>
                    <button className={cx('search_icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input type="text" placeholder="Tìm kiếm bài đăng" className={cx('search_input')} />
                    <button className={cx('clear_icon')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                </div> */}
                        <div className={cx('py-3', 'mt-5')}>
                            <table className={cx('table', 'table-bordered')}>
                                <thead className={cx('table-primary')}>
                                    <tr className={cx('text-center')}>
                                        <th style={{ width: '3%' }}>STT</th>
                                        <th style={{ width: '58%' }}>Nội dung</th>
                                        <th style={{ width: '10%' }}>Tác giả</th>
                                        <th style={{ width: '10%' }}>Chuyên mục</th>
                                        <th style={{ width: '6%' }}>Lượt phản hồi</th>
                                        <th style={{ width: '6%' }}>Lượt cảm xúc</th>
                                        <th style={{ width: '20rem' }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {postList.map((postItem, index) => (
                                        <tr key={postItem.id}>
                                            <td className={cx('text-center')}>{serial[index]}</td>
                                            <td>{postItem.content}</td>
                                            <td>{`${postItem.first_name} ${postItem.last_name}`}</td>
                                            <td>{postItem.name}</td>
                                            <td>{postItem.comment_count}</td>
                                            <td>{postItem.reaction_count}</td>
                                            <td>
                                                <div
                                                    className={cx(
                                                        'd-flex',
                                                        'align-items-center',
                                                        'w-100',
                                                        'justify-content-center',
                                                        'h-100'
                                                    )}
                                                    onClick={() => handleDeletePost(postItem.id)}
                                                >
                                                    <Button danger small margin>
                                                        Xóa
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={cx('d-flex', 'justify-content-end', 'w-100', 'me-3', 'py-2', 'mb-4', 'px-4')}>
                        <div className={cx('btn_pagination_wrapper', 'h-100')}>
                            <button
                                type="button"
                                className={cx('btn_pagination', { btnDisabled: pageNumber === 1 })}
                                onClick={handlePreviousClick}
                            >
                                Previous
                            </button>
                            {totalPages.map((pageIndex, index) => (
                                <button
                                    type="button"
                                    className={cx('btn_pagination', { paginationFocus: pageIndex === pageNumber })}
                                    key={index}
                                    onClick={() => handleClickPagination(pageIndex)}
                                >
                                    {pageIndex}
                                </button>
                            ))}
                            <button
                                type="button"
                                className={cx('btn_pagination', { btnDisabled: pageNumber === totalPages.length })}
                                onClick={handleNextClick}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                    {deletePostAlert && (
                        <Alert
                            iconImage={SmileIcon}
                            content="Xóa bài đăng thành công"
                            setAlertPopup={setDeletePostAlert}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default CommunityManagement;
