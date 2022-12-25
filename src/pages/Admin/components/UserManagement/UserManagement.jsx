import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import axios from 'axios';

import styles from './UserManagement.module.scss';
import { Button } from '~/components/Button';
import UpdateUser from './UpdateUser';
import { getTotalPageList, getSerialList } from '~/utils/PaginationUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';
import { httpRequest, removeVietnameseTones } from '~/utils';
import { Loading } from '~/components/Loading';

const cx = classNames.bind(styles);

const SearchItem = ({ patientList, searchValue, setUpdateUser, setPatientId, handleBlock }) => {
    return (
        <>
            {patientList.map((patientItem, index) => {
                if (
                    removeVietnameseTones(patientItem.fullName)
                        .toLowerCase()
                        .trim()
                        .indexOf(removeVietnameseTones(searchValue).toLowerCase().trim()) !== -1
                ) {
                    return (
                        <tr key={patientItem.id}>
                            <td className={cx('text-center')}>{index + 1}</td>
                            <td>{patientItem.avatar}</td>
                            <td>{patientItem.fullName}</td>
                            <td>{patientItem.email}</td>
                            <td>{patientItem.status}</td>
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
                                            setUpdateUser(true);
                                            setPatientId(patientItem.id);
                                        }}
                                    >
                                        Chi tiết
                                    </Button>
                                    <Button danger small margin onClick={() => handleBlock(patientItem.id)}>
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

const UserManagement = () => {
    const [updateUser, setUpdateUser] = useState(false);
    const [patientList, setPatientList] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [patientId, setPatientId] = useState('');
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [blockAlert, setBlockAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [serial, setSerial] = useState();

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const { data } = await httpRequest.get(
                '/admin/patient/info',
                { params: { pageSize: 5, pageNumber } },
                { cancelToken: cancelToken.token }
            );
            setPatientList(data.data.patientList);
            setTotalPages(getTotalPageList(data.totalPages));
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

    const handleBlock = async (patientId) => {
        if (!window.confirm('Bạn có chắc muốn chặn bệnh nhân này không?')) return false;
        else {
            await httpRequest.put(`/admin/patient/block/${patientId}`);
            setBlockAlert(true);
            setCheckUpdate(!checkUpdate);
        }
    };

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <>
            {patientList && totalPages && serial && (
                <>
                    <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                        <h2 className={cx('fw-bold')}>Quản lý bệnh nhân</h2>
                        <hr />
                        <div className={cx('search_wrapper')}>
                            <button className={cx('search_icon')}>
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </button>
                            <input
                                type="text"
                                placeholder="Tìm kiếm bệnh nhân"
                                className={cx('search_input')}
                                onInput={handleSearch}
                                value={searchValue}
                            />
                            <button
                                className={cx('clear_icon')}
                                onClick={() => {
                                    setSearchValue('');
                                }}
                            >
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        </div>
                        <div className={cx('py-3', 'mt-5')}>
                            <table className={cx('table', 'table-bordered')}>
                                <thead className={cx('table-primary')}>
                                    <tr className={cx('text-center')}>
                                        <th style={{ width: '3%' }}>STT</th>
                                        <th style={{ width: '52%' }}>Avatar</th>
                                        <th style={{ width: '10%' }}>Họ và tên</th>
                                        <th style={{ width: '14%' }}>Email</th>
                                        <th style={{ width: '8%' }}>Trạng thái</th>
                                        <th style={{ width: '20rem' }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchValue !== '' ? (
                                        <SearchItem
                                            patientList={patientList}
                                            searchValue={searchValue}
                                            setUpdateUser={setUpdateUser}
                                            setPatientId={setPatientId}
                                            handleBlock={handleBlock}
                                        />
                                    ) : (
                                        patientList.map((patientItem, index) => (
                                            <tr key={patientItem.id}>
                                                <td className={cx('text-center')}>{serial[index]}</td>
                                                <td>{patientItem.avatar}</td>
                                                <td>{patientItem.fullName}</td>
                                                <td>{patientItem.email}</td>
                                                <td>{patientItem.status}</td>
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
                                                                setUpdateUser(true);
                                                                setPatientId(patientItem.id);
                                                            }}
                                                        >
                                                            Chi tiết
                                                        </Button>
                                                        <Button
                                                            danger
                                                            small
                                                            margin
                                                            onClick={() => handleBlock(patientItem.id)}
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
                    {updateUser && (
                        <UpdateUser
                            setUpdateUser={setUpdateUser}
                            patientId={patientId}
                            checkUpdate={checkUpdate}
                            setCheckUpdate={setCheckUpdate}
                            setLoading={setLoading}
                        />
                    )}
                </>
            )}
            {blockAlert && (
                <Alert iconImage={SmileIcon} content="Chặn người dùng thành công" setAlertPopup={setBlockAlert} />
            )}
            {loading && <Loading messageLoading="Đang tiến hành cập nhật" />}
        </>
    );
};

export default UserManagement;
