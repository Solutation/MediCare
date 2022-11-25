import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCircleXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './ConsultantsManagement.module.scss';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const ConsultantsManagement = () => {
    return (
        <>
            <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                <h2 className={cx('fw-bold')}>Quản lý chuyên gia</h2>
                <hr />
                <div className={cx('search_wrapper')}>
                    <button className={cx('search_icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input type="text" placeholder="Tìm kiếm chuyên gia" className={cx('search_input')} />
                    <button className={cx('clear_icon')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                </div>
                <div className={cx('py-3', 'mt-5')}>
                    <table className={cx('table', 'table-bordered')}>
                        <thead className={cx('table-primary')}>
                            <tr>
                                <th style={{ width: '3%' }}>Id</th>
                                <th>Email</th>
                                <th style={{ width: '18%' }}>Mật khẩu</th>
                                <th>Họ lót</th>
                                <th style={{ width: '8%' }}>Tên</th>
                                <th style={{ width: '12%' }}>Số điện thoại</th>
                                <th style={{ width: '22%' }}>Địa chỉ</th>
                                <th>Ảnh đại diện</th>
                                <th>Ngày sinh</th>
                                <th style={{ width: '36%' }}>Mô tả</th>
                                <th style={{ width: '16%' }}>Điểm trung bình</th>
                                <th style={{ width: '8rem' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>khuongtri@gmail.com</td>
                                <td>tri123</td>
                                <td>Khương</td>
                                <td>Tri</td>
                                <td>12345910123</td>
                                <td>23 Lê Lợi</td>
                                <td>charlotte.jpg</td>
                                <td>01/02/2000</td>
                                <td>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, consequuntur
                                    vitae! Maiores provident necessitatibus doloribus ex reiciendis nam et veritatis.
                                </td>
                                <td>7.4</td>
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
                            <tr>
                                <td>1</td>
                                <td>khuongtri@gmail.com</td>
                                <td>tri123</td>
                                <td>Khương</td>
                                <td>Tri</td>
                                <td>12345910123</td>
                                <td>23 Lê Lợi</td>
                                <td>charlotte.jpg</td>
                                <td>01/02/2000</td>
                                <td>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, consequuntur
                                    vitae! Maiores provident necessitatibus doloribus ex reiciendis nam et veritatis.
                                </td>
                                <td>7.4</td>
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
                            <tr>
                                <td>1</td>
                                <td>khuongtri@gmail.com</td>
                                <td>tri123</td>
                                <td>Khương</td>
                                <td>Tri</td>
                                <td>12345910123</td>
                                <td>23 Lê Lợi</td>
                                <td>charlotte.jpg</td>
                                <td>01/02/2000</td>
                                <td>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facere, consequuntur
                                    vitae! Maiores provident necessitatibus doloribus ex reiciendis nam et veritatis.
                                </td>
                                <td>7.4</td>
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
        </>
    );
};

export default ConsultantsManagement;
