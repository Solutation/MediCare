import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './Certificate.module.scss';
import { Button } from '~/components/Button';
import { httpRequest, handleDateResponse } from '~/utils';
import { getTotalPageList, getSerialList } from '~/utils/PaginationUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);

const AddCertificate = ({ consultantId, checkUpdate, setCheckUpdate, setAddPopup }) => {
    const [certificateType, setCertificateType] = useState('');
    const [dateGranted, setDateGranted] = useState('');
    const [hideType, setHideType] = useState(true);
    const [hideDate, setHideDate] = useState(true);

    const handleAddCertificate = async () => {
        if (certificateType === '' || dateGranted === '') {
            if (certificateType === '') setHideType(false);
            if (dateGranted === '') setHideDate(false);
            return;
        }
        const dateToSend = {
            certificate_type: certificateType,
            date_granted: dateGranted
        };
        await httpRequest.post('/admin/consultant/certificate/add', dateToSend, { params: { consultantId } });
        setAddPopup(true);
        setCertificateType('');
        setDateGranted('');
        setCheckUpdate(!checkUpdate);
    };

    return (
        <div className={cx('row')}>
            <div className={cx('col-8', 'd-flex', 'flex-column', 'py-2')}>
                <span className={cx('form_label')}>Loại chứng chỉ</span>
                <input
                    className={cx('form_input')}
                    autoComplete="new-password"
                    value={certificateType}
                    onChange={(e) => setCertificateType(e.target.value)}
                    onInput={() => setHideType(true)}
                />
                <span className={cx('error_message', { hide: hideType })} style={{ marginTop: '7.4rem' }}>
                    Loại chứng chỉ không được để trống
                </span>
            </div>
            <div className={cx('col-3', 'd-flex', 'flex-column', 'py-2')}>
                <span className={cx('form_label')}>Ngày cấp</span>
                <input
                    className={cx('form_input_date')}
                    autoComplete="new-password"
                    type="date"
                    value={dateGranted}
                    onChange={(e) => {
                        setDateGranted(e.target.value);
                        setHideDate(true);
                    }}
                />
                <span className={cx('error_message', { hide: hideDate })} style={{ marginTop: '7.4rem' }}>
                    Ngày cấp không được để trống
                </span>
            </div>
            <div
                className={cx('col-1', 'py-2', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-end')}
                onClick={() => {
                    setCertificateType('');
                    setDateGranted('');
                }}
            >
                <Button warning small>
                    Xóa
                </Button>
            </div>
            <div className={cx('col-2', 'mt-5')} onClick={handleAddCertificate}>
                <Button outline small leftIcon={<FontAwesomeIcon icon={faPlus} />} type="button">
                    Thêm chứng chỉ
                </Button>
            </div>
        </div>
    );
};

const Certificate = ({ setCertificate, consultantId }) => {
    const [certificateList, setCertificateList] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [serial, setSerial] = useState();
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [deletePopup, setDeletePopup] = useState(false);
    const [addPopup, setAddPopup] = useState(false);

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: {
                    totalPages,
                    data: { certificateList }
                }
            } = await httpRequest.get(
                `/admin/consultant/certificate/${consultantId}`,
                { params: { pageSize: 4, pageNumber } },
                { cancelToken: cancelToken.token }
            );
            setTotalPages(getTotalPageList(totalPages));
            setSerial(getSerialList(pageNumber, 4));
            setCertificateList(certificateList);
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

    const handleDeleteCertificate = async (certificateId) => {
        if (!window.confirm('Bạn có chắc muốn xóa chứng chỉ này không?')) return false;
        else {
            await httpRequest.delete(`/admin/consultant/certificate/delete/${certificateId}`, {
                params: { consultantId }
            });
            setDeletePopup(true);
            setCheckUpdate(!checkUpdate);
        }
    };

    return (
        <>
            {certificateList && totalPages && serial && (
                <div className={cx('blur')}>
                    <div className={cx('blur_overllay')}></div>
                    <div className={cx('wrapper')}>
                        <div className={cx('p-2', 'h-100')} style={{ marginTop: '1.4rem' }}>
                            <table className={cx('table', 'table-bordered')}>
                                <thead className={cx('table-primary')}>
                                    <tr>
                                        <th style={{ width: '3%' }}>STT</th>
                                        <th style={{ width: '30%' }}>Loại</th>
                                        <th style={{ width: '22%' }}>Ngày cấp phép</th>
                                        <th style={{ width: '20rem' }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {certificateList.map((certificateItem, index) => {
                                        return (
                                            <tr key={certificateItem.id}>
                                                <td>{serial[index]}</td>
                                                <td>{certificateItem.type}</td>
                                                <td>{handleDateResponse(certificateItem.date_granted)}</td>
                                                <td>
                                                    <div
                                                        className={cx(
                                                            'd-flex',
                                                            'align-items-center',
                                                            'w-100',
                                                            'justify-content-center',
                                                            'h-100'
                                                        )}
                                                        onClick={() => handleDeleteCertificate(certificateItem.id)}
                                                    >
                                                        <Button danger small margin>
                                                            Xóa
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <AddCertificate
                                consultantId={consultantId}
                                checkUpdate={checkUpdate}
                                setCheckUpdate={setCheckUpdate}
                                setAddPopup={setAddPopup}
                            />
                            <div
                                className={cx('d-flex', 'justify-content-end', 'w-100', 'me-3', 'py-1', 'mb-2', 'px-4')}
                                style={{ marginTop: '3rem' }}
                            >
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
                                        onClick={handleNextClick}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                            <div
                                className={cx(
                                    'd-flex',
                                    'w-100',
                                    'justify-content-center',
                                    'align-items-center',
                                    'py-3'
                                )}
                            >
                                <div style={{ marginRight: '3rem' }}>
                                    <Button warning>Lưu</Button>
                                </div>
                                <div
                                    onClick={() => {
                                        setCertificate(false);
                                        serial = 0;
                                    }}
                                >
                                    <Button secondary>Hủy</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {deletePopup && (
                <Alert iconImage={SmileIcon} content="Xóa chứng chỉ thành công" setAlertPopup={setDeletePopup} />
            )}
            {addPopup && (
                <Alert iconImage={SmileIcon} content="Thêm chứng chỉ thành công" setAlertPopup={setAddPopup} />
            )}
        </>
    );
};

export default Certificate;
