import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './ConsultantsManagement.module.scss';
import { Button } from '~/components/Button';
import Detail from './Detail';
import AddConsultant from './AddConsultant';
import { httpRequest, removeVietnameseTones } from '~/utils';
import { getTotalPageList, getSerialList } from '~/utils/PaginationUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);

const SearchItem = ({ consultantList, searchValue, setDetail, setConsultantId, handleBlock, serial }) => {
    return (
        <>
            {consultantList.map((consultantItem, index) => {
                if (
                    removeVietnameseTones(consultantItem.fullName)
                        .toLowerCase()
                        .trim()
                        .indexOf(removeVietnameseTones(searchValue).toLowerCase().trim()) !== -1
                ) {
                    return (
                        <tr key={consultantItem.id}>
                            <td>{serial[index]}</td>
                            <td>{consultantItem.avatar}</td>
                            <td>{consultantItem.fullName}</td>
                            <td>{consultantItem.email}</td>
                            <td>{consultantItem.status}</td>
                            <td>{consultantItem.category}</td>
                            <td>{consultantItem.average_score}</td>
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
                                            setDetail(true);
                                            setConsultantId(consultantItem.id);
                                        }}
                                    >
                                        Chi tiết
                                    </Button>
                                    <Button danger small margin onClick={() => handleBlock(consultantItem.id)}>
                                        Chặn
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

const ConsultantsManagement = () => {
    const [detail, setDetail] = useState(false);
    const [add, setAdd] = useState(false);
    const [consultantList, setConsultantList] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [consultantId, setConsultantId] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [serial, setSerial] = useState();
    const [blockAlert, setBlockAlert] = useState(false);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: {
                    totalPages,
                    data: { consultantList }
                }
            } = await httpRequest.get(
                '/admin/consultant/info',
                { params: { pageSize: 4, pageNumber } },
                { cancelToken: cancelToken.token }
            );
            setConsultantList(consultantList);
            setTotalPages(getTotalPageList(totalPages));
            setSerial(getSerialList(pageNumber, 4));
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

    const handleBlock = async (consultantId) => {
        if (!window.confirm('Bạn có chắc muốn chặn chuyên gia này không?')) return false;
        else {
            await httpRequest.put(`/admin/consultant/block/${consultantId}`);
            setBlockAlert(true);
            setCheckUpdate(!checkUpdate);
        }
    };

    return (
        <>
            {consultantList && totalPages && serial && (
                <>
                    <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                        <h2 className={cx('fw-bold')}>Quản lý chuyên gia</h2>
                        <hr />
                        <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                            <div className={cx('search_wrapper')}>
                                <button className={cx('search_icon')}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm chuyên gia"
                                    className={cx('search_input')}
                                    value={searchValue}
                                    onInput={(e) => setSearchValue(e.target.value)}
                                />
                                <button className={cx('clear_icon')} onClick={() => setSearchValue('')}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            </div>
                            <div onClick={() => setAdd(true)}>
                                <Button warning>Thêm mới</Button>
                            </div>
                        </div>
                        <div className={cx('py-3', 'mt-5')}>
                            <table className={cx('table', 'table-bordered')}>
                                <thead className={cx('table-primary')}>
                                    <tr>
                                        <th style={{ width: '3%' }}>STT</th>
                                        <th style={{ width: '30%' }}>Avatar</th>
                                        <th style={{ width: '12%' }}>Họ và tên</th>
                                        <th style={{ width: '14%' }}>Email</th>
                                        <th style={{ width: '8%' }}>Trạng thái</th>
                                        <th style={{ width: '12%' }}>Chuyên môn</th>
                                        <th style={{ width: '8%' }}>Điểm đánh giá TB</th>
                                        <th style={{ width: '20rem' }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchValue !== '' ? (
                                        <SearchItem
                                            consultantList={consultantList}
                                            searchValue={searchValue}
                                            setDetail={setDetail}
                                            setConsultantId={setConsultantId}
                                            handleBlock={handleBlock}
                                            serial={serial}
                                        />
                                    ) : (
                                        consultantList.map((consultantItem, index) => (
                                            <tr key={consultantItem.id}>
                                                <td>{serial[index]}</td>
                                                <td>{consultantItem.avatar}</td>
                                                <td>{consultantItem.fullName}</td>
                                                <td>{consultantItem.email}</td>
                                                <td>{consultantItem.status}</td>
                                                <td>{consultantItem.category}</td>
                                                <td>{consultantItem.average_score}</td>
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
                                                                setDetail(true);
                                                                setConsultantId(consultantItem.id);
                                                            }}
                                                        >
                                                            Chi tiết
                                                        </Button>
                                                        <Button
                                                            danger
                                                            small
                                                            margin
                                                            onClick={() => handleBlock(consultantItem.id)}
                                                        >
                                                            Chặn
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
                    {detail && (
                        <Detail
                            setDetail={setDetail}
                            consultantId={consultantId}
                            checkUpdate={checkUpdate}
                            setCheckUpdate={setCheckUpdate}
                        />
                    )}
                    {add && <AddConsultant setAdd={setAdd} checkUpdate={checkUpdate} setCheckUpdate={setCheckUpdate} />}
                    {blockAlert && (
                        <Alert
                            iconImage={SmileIcon}
                            content="Chặn chuyên gia thành công!"
                            setAlertPopup={setBlockAlert}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default ConsultantsManagement;
