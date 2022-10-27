import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { Pagination } from '../Pagination';

import styles from './ProfessorListContainer.module.scss';

const cx = classNames.bind(styles);

const ProfessorListContainer = () => {
    return (
        <>
            <section id="professor-list">
                <div className={cx('container')}>
                    <div className={cx('row-wrapper')}>
                        <div className={cx('row')}>
                            <div className={cx('professor-wrapper', 'd-flex', 'flex-wrap')}>
                                <div className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}>
                                    <div className={cx('professor-content')}>
                                        <Link to="">
                                            <img
                                                src={require('../../../assets/doctor1.jpg')}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </Link>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-role')}>Cosmetic Surgeon</div>
                                            <div className={cx('professor-name')}>Lâm Khương Trí</div>
                                            <div className={cx('professor-description')}>
                                                Donec varius libero tortor, eu luctus ipsum aliquet ut.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}>
                                    <div className={cx('professor-content')}>
                                        <Link to="">
                                            <img
                                                src={require('../../../assets/doctor1.jpg')}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </Link>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-role')}>Cosmetic Surgeon</div>
                                            <div className={cx('professor-name')}>Lâm Khương Trí</div>
                                            <div className={cx('professor-description')}>
                                                Donec varius libero tortor, eu luctus ipsum aliquet ut.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}>
                                    <div className={cx('professor-content')}>
                                        <Link to="">
                                            <img
                                                src={require('../../../assets/doctor1.jpg')}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </Link>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-role')}>Cosmetic Surgeon</div>
                                            <div className={cx('professor-name')}>Lâm Khương Trí</div>
                                            <div className={cx('professor-description')}>
                                                Donec varius libero tortor, eu luctus ipsum aliquet ut.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}>
                                    <div className={cx('professor-content')}>
                                        <Link to="">
                                            <img
                                                src={require('../../../assets/doctor1.jpg')}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </Link>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-role')}>Cosmetic Surgeon</div>
                                            <div className={cx('professor-name')}>Lâm Khương Trí</div>
                                            <div className={cx('professor-description')}>
                                                Donec varius libero tortor, eu luctus ipsum aliquet ut.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}>
                                    <div className={cx('professor-content')}>
                                        <Link to="">
                                            <img
                                                src={require('../../../assets/doctor1.jpg')}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </Link>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-role')}>Cosmetic Surgeon</div>
                                            <div className={cx('professor-name')}>Lâm Khương Trí</div>
                                            <div className={cx('professor-description')}>
                                                Donec varius libero tortor, eu luctus ipsum aliquet ut.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}>
                                    <div className={cx('professor-content')}>
                                        <Link to="">
                                            <img
                                                src={require('../../../assets/doctor1.jpg')}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </Link>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-role')}>Cosmetic Surgeon</div>
                                            <div className={cx('professor-name')}>Lâm Khương Trí</div>
                                            <div className={cx('professor-description')}>
                                                Donec varius libero tortor, eu luctus ipsum aliquet ut.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}>
                                    <div className={cx('professor-content')}>
                                        <Link to="">
                                            <img
                                                src={require('../../../assets/doctor1.jpg')}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </Link>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-role')}>Cosmetic Surgeon</div>
                                            <div className={cx('professor-name')}>Lâm Khương Trí</div>
                                            <div className={cx('professor-description')}>
                                                Donec varius libero tortor, eu luctus ipsum aliquet ut.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}>
                                    <div className={cx('professor-content')}>
                                        <Link to="">
                                            <img
                                                src={require('../../../assets/doctor1.jpg')}
                                                alt="Anh"
                                                className={cx('professor-image')}
                                            ></img>
                                        </Link>
                                        <div className={cx('professor-info')}>
                                            <div className={cx('professor-role')}>Cosmetic Surgeon</div>
                                            <div className={cx('professor-name')}>Lâm Khương Trí</div>
                                            <div className={cx('professor-description')}>
                                                Donec varius libero tortor, eu luctus ipsum aliquet ut.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Pagination></Pagination>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProfessorListContainer;
