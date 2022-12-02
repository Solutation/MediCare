import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';

import styles from './ProfessorList.module.scss';
import { httpRequest } from '~/utils';
import { getTotalPageList } from '~/utils/PaginationUtils';
import { Navigator } from '~/components/Navigator';

const cx = classNames.bind(styles);

const ProfessorList = () => {
    const { t } = useTranslation('professorlist');
    const [totalPages, setTotalPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [consultantList, setConsultantList] = useState();
    const pageItem = [{ id: 1, name: t('professor'), to: '' }];
    const navigate = useNavigate();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: {
                    data: { consultantList },
                    totalPages
                }
            } = await httpRequest.get(
                '/consultant/list',
                { params: { pageSize: 6, pageNumber } },
                { cancelToken: cancelToken.token }
            );
            setTotalPages(getTotalPageList(totalPages));
            setConsultantList(consultantList);
        };
        fetchAPI();

        return () => {
            cancelToken.cancel();
        };
    }, [pageNumber]);

    const handleClickPagination = (pageIndex) => {
        setPageNumber(pageIndex);
    };

    const handlePrevious = () => {
        setPageNumber((prevPageNumber) => prevPageNumber - 1);
    };

    const handleNext = () => {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
    };

    return (
        <>
            {consultantList && totalPages && (
                <>
                    <Navigator title={t('professor')} page={pageItem} bgPrimaryBold />
                    <div className={cx('wrapper')}>
                        <div className={cx('professor-header')}>
                            <h3 className={cx('header', 'text-center')}>{t('title')}</h3>
                        </div>
                        <div className={cx('container')}>
                            <div className={cx('row')}>
                                <div className={cx('professor-wrapper', 'd-flex', 'flex-wrap')}>
                                    {consultantList.map((consultant, index) => (
                                        <div
                                            className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}
                                            key={consultant.id}
                                            onClick={() => navigate(`/consultant?consultantId=${consultant.id}`)}
                                        >
                                            <div style={{ cursor: 'pointer' }}>
                                                <div className={cx('professor-content')}>
                                                    <img
                                                        src={consultant.avatar}
                                                        alt="Anh"
                                                        className={cx('professor-image')}
                                                    ></img>
                                                    <div className={cx('professor-info')}>
                                                        {/* <div className={cx('professor-role')}>{item.role}</div> */}
                                                        <div
                                                            className={cx('professor-name')}
                                                        >{`${consultant.first_name} ${consultant.last_name}`}</div>
                                                        <div className={cx('professor-description')}>
                                                            {consultant.descriptions}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className={cx('d-flex', 'justify-content-end', 'w-100', 'me-4')}>
                                        <div className={cx('btn_pagination_wrapper', 'h-100')}>
                                            <button
                                                type="button"
                                                className={cx('btn_pagination', { btnDisabled: pageNumber === 1 })}
                                                onClick={handlePrevious}
                                            >
                                                Previous
                                            </button>
                                            {totalPages.map((pageIndex, index) => (
                                                <button
                                                    type="button"
                                                    className={cx('btn_pagination', {
                                                        paginationFocus: pageIndex === pageNumber
                                                    })}
                                                    key={index}
                                                    onClick={() => handleClickPagination(pageIndex)}
                                                >
                                                    {pageIndex}
                                                </button>
                                            ))}
                                            <button
                                                type="button"
                                                className={cx('btn_pagination', {
                                                    btnDisabled: pageNumber === totalPages.length
                                                })}
                                                onClick={handleNext}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProfessorList;
