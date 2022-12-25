import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './ArticleManagement.module.scss';
import { Button } from '~/components/Button';
import Detail from './Detail';
import { httpRequest, removeVietnameseTones } from '~/utils';
import { getTotalPageList, getSerialList } from '~/utils/PaginationUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);

const SearchItem = ({ articleList, searchValue, setDetailArticle, setArticleId, handleDeleteArticle, serial }) => {
    return (
        <>
            {articleList.map((articleItem, index) => {
                if (
                    removeVietnameseTones(articleItem.title)
                        .toLowerCase()
                        .trim()
                        .indexOf(removeVietnameseTones(searchValue).toLowerCase().trim()) !== -1
                ) {
                    return (
                        <tr key={articleItem.id}>
                            <td>{serial[index]}</td>
                            <td>
                                {articleItem.title > 50 ? `${articleItem.title.slice(0, 50)}...` : articleItem.title}
                            </td>
                            <td>{articleItem.consultant_name}</td>
                            <td>{articleItem.category_name}</td>
                            <td>{articleItem.status}</td>
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
                                        primary
                                        small
                                        margin
                                        onClick={() => {
                                            setDetailArticle(true);
                                            setArticleId(articleItem.id);
                                        }}
                                    >
                                        Chi tiết
                                    </Button>
                                    <Button danger small margin onClick={() => handleDeleteArticle(articleItem.id)}>
                                        Xóa
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    );
                }
                return null;
            })}
        </>
    );
};

const ArticleManagement = () => {
    const [detailArticle, setDetailArticle] = useState(false);
    const [articleList, setArticleList] = useState();
    const [articleId, setArticleId] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [serial, setSerial] = useState();
    const [searchValue, setSearchValue] = useState('');
    const [deleteArticleAlert, setDeleteArticleAlert] = useState(false);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: {
                    totalPages,
                    data: { articleList }
                }
            } = await httpRequest.get(
                '/admin/article/info',
                { params: { pageSize: 10, pageNumber } },
                { cancelToken: cancelToken.token }
            );
            setArticleList(articleList);
            setTotalPages(getTotalPageList(totalPages));
            setSerial(getSerialList(pageNumber, 10));
        };
        fetchAPI();
        return () => {
            cancelToken.cancel();
        };
    }, [pageNumber, checkUpdate]);

    const handleDeleteArticle = async (articleId) => {
        if (!window.confirm('Bạn có chắc muốn xóa bài viết này không?')) return false;
        else {
            await httpRequest.delete(`/admin/article/delete/${articleId}`);
            setDeleteArticleAlert(true);
            setCheckUpdate(!checkUpdate);
        }
    };

    const handleClickPagination = (pageIndex) => {
        setPageNumber(pageIndex);
    };

    const handlePreviousClick = () => {
        setPageNumber(pageNumber - 1);
    };

    const handleNextClick = () => {
        setPageNumber(pageNumber + 1);
    };

    return (
        <>
            {articleList && totalPages && serial && (
                <>
                    <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                        <h2 className={cx('fw-bold')}>Quản lý bài viết</h2>
                        <hr />
                        <div className={cx('search_wrapper')}>
                            <button className={cx('search_icon')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                            <input
                                type="text"
                                placeholder="Tìm kiếm bài viết"
                                className={cx('search_input')}
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <button className={cx('clear_icon')} onClick={() => setSearchValue('')}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        </div>
                        <div className={cx('py-3', 'mt-5')}>
                            <table className={cx('table', 'table-bordered')}>
                                <thead className={cx('table-primary')}>
                                    <tr className={cx('text-center')}>
                                        <th style={{ width: '3%' }}>STT</th>
                                        <th style={{ width: '40%' }}>Tiêu đề</th>
                                        <th style={{ width: '12%' }}>Tác giả</th>
                                        <th style={{ width: '12%' }}>Chuyên mục</th>
                                        <th style={{ width: '14%' }}>Trạng thái</th>
                                        <th style={{ width: '20rem' }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchValue !== '' ? (
                                        <SearchItem
                                            articleList={articleList}
                                            searchValue={searchValue}
                                            setDetailArticle={setDetailArticle}
                                            setArticleId={setArticleId}
                                            handleDeleteArticle={handleDeleteArticle}
                                            serial={serial}
                                        />
                                    ) : (
                                        articleList.map((articleItem, index) => (
                                            <tr key={articleItem.id}>
                                                <td>{serial[index]}</td>
                                                <td>
                                                    {articleItem.title > 50
                                                        ? `${articleItem.title.slice(0, 50)}...`
                                                        : articleItem.title}
                                                </td>
                                                <td>{articleItem.consultant_name}</td>
                                                <td>{articleItem.category_name}</td>
                                                <td>{articleItem.status}</td>
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
                                                            primary
                                                            small
                                                            margin
                                                            onClick={() => {
                                                                setArticleId(articleItem.id);
                                                                setDetailArticle(true);
                                                            }}
                                                        >
                                                            Chi tiết
                                                        </Button>
                                                        <Button
                                                            danger
                                                            small
                                                            margin
                                                            onClick={() => handleDeleteArticle(articleItem.id)}
                                                        >
                                                            Xóa
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
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
                    {detailArticle && (
                        <Detail
                            setDetailArticle={setDetailArticle}
                            articleId={articleId}
                            checkUpdate={checkUpdate}
                            setCheckUpdate={setCheckUpdate}
                        />
                    )}
                    {deleteArticleAlert && (
                        <Alert
                            iconImage={SmileIcon}
                            content="Xóa bài viết thành công!"
                            setAlertPopup={setDeleteArticleAlert}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default ArticleManagement;
