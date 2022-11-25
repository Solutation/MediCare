import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './ImageArticleManagement.module.scss';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const ImageArticleManagement = () => {
    return (
        <>
            <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                <h2 className={cx('fw-bold')}>Quản lý ảnh bài viết</h2>
                <hr />
                <div className={cx('search_wrapper')}>
                    <button className={cx('search_icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input type="text" placeholder="Tìm kiếm ảnh bài viết" className={cx('search_input')} />
                    <button className={cx('clear_icon')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                </div>
                <div className={cx('py-3', 'mt-5')}>
                    <table className={cx('table', 'table-bordered')}>
                        <thead className={cx('table-primary')}>
                            <tr className={cx('text-center')}>
                                <th style={{ width: '3%' }}>Id</th>
                                <th style={{ width: '8%' }}>Article_id</th>
                                <th style={{ width: '40%' }}>Ảnh bài viết</th>
                                <th style={{ width: '16rem' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx('text-center')}>1</td>
                                <td>2</td>
                                <td>eyes.png</td>
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
                                <td className={cx('text-center')}>1</td>
                                <td>2</td>
                                <td>eyes.png</td>
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
                                <td className={cx('text-center')}>1</td>
                                <td>2</td>
                                <td>eyes.png</td>
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

export default ImageArticleManagement;
