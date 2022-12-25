import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './RatingManagement.module.scss';
import { Button } from '~/components/Button';
import { httpRequest } from '~/utils';
import { getSerialList, getTotalPageList } from '~/utils/PaginationUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);

const RatingManagement = () => {
    const [ratingList, setRatingList] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [deleteAlert, setDeleteAlert] = useState(false);
    const [serial, setSerial] = useState();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: {
                    totalPages,
                    data: { ratingList }
                }
            } = await httpRequest.get(
                '/admin/rating/list',
                { params: { pageSize: 5, pageNumber } },
                { cancelToken: cancelToken.token }
            );
            setRatingList(ratingList);
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

    const handleDeleteRating = async (ratingId) => {
        if (!window.confirm('Bạn có chắc muốn xóa đánh giá này không?')) return false;
        else {
            await httpRequest.delete(`/admin/rating/delete/${ratingId}`);
            setDeleteAlert(true);
            setCheckUpdate(!checkUpdate);
        }
    };

    return (
        <>
            {ratingList && serial && totalPages && (
                <>
                    <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                        <h2 className={cx('fw-bold')}>Quản lý đánh giá</h2>
                        <hr />
                        {/* <div className={cx('search_wrapper')}>
                            <button className={cx('search_icon')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                            <input type="text" placeholder="Tìm kiếm đánh giá" className={cx('search_input')} />
                            <button className={cx('clear_icon')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        </div> */}
                        <div className={cx('py-3', 'mt-5')}>
                            <table className={cx('table', 'table-bordered')}>
                                <thead className={cx('table-primary')}>
                                    <tr>
                                        <th style={{ width: '3%' }}>STT</th>
                                        <th style={{ width: '40%' }}>Nội dung</th>
                                        <th style={{ width: '8%' }}>Điểm</th>
                                        <th style={{ width: '14%' }}>Người đánh giá</th>
                                        <th style={{ width: '14%' }}>Chuyên gia</th>
                                        <th style={{ width: '20rem' }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ratingList.map((ratingItem, index) => (
                                        <tr key={ratingItem.id}>
                                            <td>{serial[index]}</td>
                                            <td>{ratingItem.content}</td>
                                            <td>{ratingItem.score}</td>
                                            <td>{`${ratingItem.patient_first_name} ${ratingItem.patient_last_name}`}</td>
                                            <td>{`${ratingItem.consultant_first_name} ${ratingItem.consultant_last_name}`}</td>
                                            <td>
                                                <div
                                                    className={cx(
                                                        'd-flex',
                                                        'align-items-center',
                                                        'w-100',
                                                        'justify-content-center',
                                                        'h-100'
                                                    )}
                                                >
                                                    <Button
                                                        danger
                                                        small
                                                        margin
                                                        onClick={() => handleDeleteRating(ratingItem.id)}
                                                    >
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
                    {deleteAlert && (
                        <Alert iconImage={SmileIcon} content="Xóa đánh giá thành công" setAlertPopup={setDeleteAlert} />
                    )}
                </>
            )}
        </>
    );
};

export default RatingManagement;
