import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faChevronRight, faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import { ProfessorListContainer } from './ProfessorListContainer';

import styles from './ProfessorList.module.scss';

const cx = classNames.bind(styles);

const ProfessorList = () => {
    return (
        <>
            <section id="articleDetailHeader" className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('d-sm-block', 'wrapper-item', 'text-center')}>
                        <h1 className={cx('title')}>CHUYÊN GIA</h1>
                        <div className={cx('d-sm-block', 'navigator-wrapper')}>
                            <Link to="">
                                <FontAwesomeIcon icon={faHouseMedical} className={cx('white', 'home-icon')} />
                            </Link>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('white', 'arrow-icon')} />
                            <h3 className={cx('navigator-item')}>Chuyên Gia</h3>
                        </div>
                    </div>
                </div>
            </section>
            <ProfessorListContainer></ProfessorListContainer>
        </>
    );
};

export default ProfessorList;
