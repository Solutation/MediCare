import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Pagination } from '../Pagination';

import styles from './CategoriesContainer.module.scss';

const cx = classNames.bind(styles);

const CategoriesContainer = () => {
    return (
        <>
            <div className={cx('container')}>
                <div className={cx('row')}>
                    <div className={cx('categories-wrapper', 'd-flex', 'flex-wrap')}>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>

                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                        <div className={cx('col-3', 'category-item')}>
                            <Link to="">
                                <div className={cx('category-wrapper')}>
                                    <img
                                        src={require('~/assets/category1.png')}
                                        alt="Anh"
                                        className={cx('category-img')}
                                    ></img>
                                    <h3 className={cx('category-content')}>Sức khỏe răng miệng</h3>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                <Pagination></Pagination>
            </div>
        </>
    );
};

export default CategoriesContainer;
