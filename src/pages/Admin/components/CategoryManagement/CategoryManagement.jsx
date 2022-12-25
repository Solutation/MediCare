import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import styles from './CategoryManagement.module.scss';
import { Button } from '~/components/Button';
import EditCategory from './EditCategory';
import AddCategory from './AddCategory';
import { httpRequest, removeVietnameseTones } from '~/utils';
import { getSerialList, getTotalPageList } from '~/utils/PaginationUtils';
import { Alert } from '~/components/Alert';
import SmileIcon from '~/assets/smile.png';

const cx = classNames.bind(styles);

const SearchItem = ({ categoryList, searchValue, setEditCategory, setCategoryId, handleDeleteCategory, serial }) => {
    return (
        <>
            {categoryList.map((categoryItem, index) => {
                if (
                    removeVietnameseTones(categoryItem.name)
                        .toLowerCase()
                        .trim()
                        .indexOf(removeVietnameseTones(searchValue).toLowerCase().trim()) !== -1
                ) {
                    return (
                        <tr key={categoryItem.id}>
                            <td className={cx('text-center')}>{serial[index]}</td>
                            <td>{categoryItem.image}</td>
                            <td>{categoryItem.name}</td>
                            <td>
                                {categoryItem.descriptions.length > 120
                                    ? `${categoryItem.descriptions.slice(0, 120)}...`
                                    : categoryItem.descriptions}
                            </td>
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
                                            setEditCategory(true);
                                            setCategoryId(categoryItem.id);
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button danger small margin onClick={() => handleDeleteCategory(categoryItem.id)}>
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

const CategoryManagement = () => {
    const [editCategory, setEditCategory] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [categoryList, setCategoryList] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [checkUpdate, setCheckUpdate] = useState(false);
    const [serial, setSerial] = useState();
    const [deleteCategoryAlert, setDeleteCategoryAlert] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [addCategoryAlert, setAddCategoryAlert] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const cancelToken = axios.CancelToken.source();
        const fetchAPI = async () => {
            const {
                data: {
                    totalPages,
                    data: { categoryList }
                }
            } = await httpRequest.get(
                '/admin/category/info',
                { params: { pageSize: 5, pageNumber } },
                { cancelToken: cancelToken.token }
            );
            setCategoryList(categoryList);
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

    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm('Bạn có chắc muốn xóa chuyên mục này không?')) return false;
        else {
            await httpRequest.delete(`/admin/category/delete/${categoryId}`);
            setDeleteCategoryAlert(true);
            setCheckUpdate(!checkUpdate);
        }
    };

    return (
        <>
            {categoryList && totalPages && serial && (
                <>
                    <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                        <h2 className={cx('fw-bold')}>Quản lý chuyên mục</h2>
                        <hr />
                        <div className={cx('d-flex', 'justify-content-between', 'align-items-center')}>
                            <div className={cx('search_wrapper')}>
                                <button className={cx('search_icon')}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm chuyên mục"
                                    className={cx('search_input')}
                                    value={searchValue}
                                    onInput={(e) => setSearchValue(e.target.value)}
                                />
                                <button className={cx('clear_icon')} onClick={() => setSearchValue('')}>
                                    <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                            </div>
                            <div onClick={() => setAddCategory(true)}>
                                <Button warning>Thêm mới</Button>
                            </div>
                        </div>
                        <div className={cx('py-3', 'mt-5')}>
                            <table className={cx('table', 'table-bordered')}>
                                <thead className={cx('table-primary')}>
                                    <tr className={cx('text-center')}>
                                        <th style={{ width: '3%' }}>STT</th>
                                        <th style={{ width: '40%' }}>Ảnh</th>
                                        <th style={{ width: '10%' }}>Tên</th>
                                        <th style={{ width: '36%' }}>Mô tả</th>
                                        <th style={{ width: '20rem' }}>Hành động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchValue !== '' ? (
                                        <SearchItem
                                            categoryList={categoryList}
                                            searchValue={searchValue}
                                            setEditCategory={setEditCategory}
                                            setCategoryId={setCategoryId}
                                            handleDeleteCategory={handleDeleteCategory}
                                            serial={serial}
                                        />
                                    ) : (
                                        categoryList.map((categoryItem, index) => (
                                            <tr key={categoryItem.id}>
                                                <td className={cx('text-center')}>{serial[index]}</td>
                                                <td>{categoryItem.image}</td>
                                                <td>{categoryItem.name}</td>
                                                <td>
                                                    {categoryItem.descriptions.length > 120
                                                        ? `${categoryItem.descriptions.slice(0, 120)}...`
                                                        : categoryItem.descriptions}
                                                </td>
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
                                                                setEditCategory(true);
                                                                setCategoryId(categoryItem.id);
                                                            }}
                                                        >
                                                            Sửa
                                                        </Button>
                                                        <Button
                                                            danger
                                                            small
                                                            margin
                                                            onClick={() => handleDeleteCategory(categoryItem.id)}
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
                    {editCategory && (
                        <EditCategory
                            setEditCategory={setEditCategory}
                            checkUpdate={checkUpdate}
                            setCheckUpdate={setCheckUpdate}
                            categoryId={categoryId}
                        />
                    )}
                    {addCategory && (
                        <AddCategory setAddCategory={setAddCategory} setAddCategoryAlert={setAddCategoryAlert} />
                    )}
                    {deleteCategoryAlert && (
                        <Alert
                            iconImage={SmileIcon}
                            content="Xóa chuyên mục thành công"
                            setAlertPopup={setDeleteCategoryAlert}
                        />
                    )}
                    {addCategoryAlert && (
                        <Alert
                            iconImage={SmileIcon}
                            content="Thêm chuyên mục thành công"
                            setAlertPopup={setAddCategoryAlert}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default CategoryManagement;
