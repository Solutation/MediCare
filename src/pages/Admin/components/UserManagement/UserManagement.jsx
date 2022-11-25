import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faGear, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './UserManagement.module.scss';
import { Button } from '~/components/Button';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';

const cx = classNames.bind(styles);

const UserManagement = () => {
    const [addUser, setAddUser] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);

    return (
        <>
            <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                <h2 className={cx('fw-bold')}>Quản lý người dùng</h2>
                <hr />
                <div className={cx('search_wrapper')}>
                    <button className={cx('search_icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input type="text" placeholder="Tìm kiếm người dùng" className={cx('search_input')} />
                    <button className={cx('clear_icon')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                </div>
                <div className={cx('py-3', 'mt-5')}>
                    <table className={cx('table', 'table-bordered')}>
                        <thead className={cx('table-primary')}>
                            <tr className={cx('text-center')}>
                                <th style={{ width: '3%' }}>Id</th>
                                <th>Email</th>
                                <th>Mật khẩu</th>
                                <th>Họ lót</th>
                                <th style={{ width: '14%' }}>Tên</th>
                                <th>Tên đăng nhập</th>
                                <th>Số điện thoại</th>
                                <th>Địa chỉ</th>
                                <th>Ảnh đại diện</th>
                                <th>Ngày sinh</th>
                                <th style={{ width: '20rem' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx('text-center')}>1</td>
                                <td>khuongtri@gmail.com</td>
                                <td>tri123</td>
                                <td>Khương</td>
                                <td>Tri</td>
                                <td>khuongtri91</td>
                                <td>12345910123</td>
                                <td>23 Lê Lợi</td>
                                <td>charlotte.jpg</td>
                                <td>01/02/2000</td>
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
                                        <Button primary small margin onClick={() => setAddUser(true)}>
                                            Thêm
                                        </Button>
                                        <Button secondary small margin onClick={() => setUpdateUser(true)}>
                                            Sửa
                                        </Button>
                                        <Button danger small margin>
                                            Xóa
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('text-center')}>2</td>
                                <td>khuongtri@gmail.com</td>
                                <td>tri123</td>
                                <td>Khương</td>
                                <td>Trí</td>
                                <td>khuongtri91</td>
                                <td>12345910123</td>
                                <td>23 Lê Lợi</td>
                                <td>charlotte.jpg</td>
                                <td>01/02/2000</td>
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
                                        <Button primary small margin onClick={() => setAddUser(true)}>
                                            Thêm
                                        </Button>
                                        <Button secondary small margin onClick={() => setUpdateUser(true)}>
                                            Sửa
                                        </Button>
                                        <Button danger small margin>
                                            Xóa
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className={cx('text-center')}>3</td>
                                <td>khuongtri@gmail.com</td>
                                <td>tri123</td>
                                <td>Khương</td>
                                <td>Trí</td>
                                <td>khuongtri91</td>
                                <td>12345910123</td>
                                <td>23 Lê Lợi</td>
                                <td>charlotte.jpg</td>
                                <td>01/02/2000</td>
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
                                        <Button primary small margin>
                                            Thêm
                                        </Button>
                                        <Button secondary small margin>
                                            Sửa
                                        </Button>
                                        <Button danger small margin>
                                            Xóa
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <nav aria-label="Page navigation" className={cx('px-4')}>
                <ul className="pagination">
                    <li className={cx('page-item')}>
                        <button className={cx('page-link')}>Previous</button>
                    </li>
                    <li className={cx('page-item')}>
                        <button className={cx('page-link')}>1</button>
                    </li>
                    <li className={cx('page-item')}>
                        <button className={cx('page-link')}>2</button>
                    </li>
                    <li className={cx('page-item')}>
                        <button className={cx('page-link')}>3</button>
                    </li>
                    <li className={cx('page-item')}>
                        <button className={cx('page-link')}>Next</button>
                    </li>
                </ul>
            </nav>
            {addUser && <AddUser setAddUser={setAddUser} />}
            {updateUser && <UpdateUser setUpdateUser={setUpdateUser} />}
        </>
    );
};

export default UserManagement;
