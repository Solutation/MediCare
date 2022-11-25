import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from './ArticleManagement.module.scss';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

const ArticleManagement = () => {
    return (
        <>
            <div className={cx('d-flex', 'flex-column', 'w-100', 'p-4')}>
                <h2 className={cx('fw-bold')}>Quản lý bài viết</h2>
                <hr />
                <div className={cx('search_wrapper')}>
                    <button className={cx('search_icon')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <input type="text" placeholder="Tìm kiếm bài viết" className={cx('search_input')} />
                    <button className={cx('clear_icon')}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                </div>
                <div className={cx('py-3', 'mt-5')}>
                    <table className={cx('table', 'table-bordered')}>
                        <thead className={cx('table-primary')}>
                            <tr className={cx('text-center')}>
                                <th style={{ width: '3%' }}>Id</th>
                                <th style={{ width: '6%' }}>Category_id</th>
                                <th style={{ width: '24%' }}>Tiêu đề</th>
                                <th style={{ width: '50%' }}>Nội dung</th>
                                <th style={{ width: '16rem' }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={cx('text-center')}>1</td>
                                <td>2</td>
                                <td>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eum eligendi
                                    inventore necessitatibus, vero repellendus?
                                </td>
                                <td>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, quisquam cum
                                    maxime cumque asperiores enim ipsum dolorem quasi ut, blanditiis reprehenderit,
                                    corrupti repellendus voluptatum non. Libero, cumque reiciendis labore, esse,
                                    corrupti incidunt iusto quaerat perferendis eveniet culpa quis! Laudantium,
                                    reprehenderit libero. Quasi fugiat ab sapiente, incidunt suscipit, assumenda,
                                    voluptas recusandae pariatur at odit natus exercitationem! Earum ad obcaecati eos
                                    quas.
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
                                <td>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eum eligendi
                                    inventore necessitatibus, vero repellendus?
                                </td>
                                <td>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, quisquam cum
                                    maxime cumque asperiores enim ipsum dolorem quasi ut, blanditiis reprehenderit,
                                    corrupti repellendus voluptatum non. Libero, cumque reiciendis labore, esse,
                                    corrupti incidunt iusto quaerat perferendis eveniet culpa quis! Laudantium,
                                    reprehenderit libero. Quasi fugiat ab sapiente, incidunt suscipit, assumenda,
                                    voluptas recusandae pariatur at odit natus exercitationem! Earum ad obcaecati eos
                                    quas.
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
                                <td>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus eum eligendi
                                    inventore necessitatibus, vero repellendus?
                                </td>
                                <td>
                                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, quisquam cum
                                    maxime cumque asperiores enim ipsum dolorem quasi ut, blanditiis reprehenderit,
                                    corrupti repellendus voluptatum non. Libero, cumque reiciendis labore, esse,
                                    corrupti incidunt iusto quaerat perferendis eveniet culpa quis! Laudantium,
                                    reprehenderit libero. Quasi fugiat ab sapiente, incidunt suscipit, assumenda,
                                    voluptas recusandae pariatur at odit natus exercitationem! Earum ad obcaecati eos
                                    quas.
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

export default ArticleManagement;
