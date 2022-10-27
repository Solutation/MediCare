import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChevronRight, faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import { ProfessorContainer } from './components/ProfessorContainer';

import styles from './ProfessorDetail.module.scss';

const cx = classNames.bind(styles);

const ProfessorDetail = () => {
    return (
        <>
            <section id="articleDetailHeader" className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('d-sm-block', 'wrapper-item', 'text-center')}>
                        <h1 className={cx('title')}>LÂM KHƯƠNG TRÍ</h1>
                        <div className={cx('d-sm-block', 'navigator-wrapper')}>
                            <Link to="">
                                <FontAwesomeIcon icon={faHouseMedical} className={cx('white', 'home-icon')} />
                            </Link>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('white', 'arrow-icon')} />
                            <h3 className={cx('navigator-item')}>Chuyên gia</h3>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('white', 'arrow-icon')} />
                            <h3 className={cx('navigator-item')}>Thông tin chuyên gia</h3>
                        </div>
                    </div>
                </div>
            </section>
            <ProfessorContainer></ProfessorContainer>
        </>
    );
};

export default ProfessorDetail;
