import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './CategoryItem.module.scss';
const cx = classNames.bind(styles);

const CategoryItem = ({ className }) => {
    return (
        <>
            <section className={cx('wr')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'pd')}>
                        <div className={cx('col-4', 'left-cc')}>
                            <h3>Chuyên mục sức khỏe</h3>
                            <div className={cx('list-cc')}>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/heartitem.png')} alt="" />
                                    <Link to="">
                                        <span>Công cụ đo nhịp tim</span>
                                    </Link>
                                </div>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/mental-health.png')} alt="" />
                                    <Link to="">
                                        <span>Công cụ đo chỉ số BMI</span>
                                    </Link>
                                </div>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/cancer.png')} alt="" />
                                    <Link to="">
                                        <span>Công cụ đo chỉ số BMR</span>
                                    </Link>
                                </div>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/eyes.png')} alt="" />
                                    <Link to="">
                                        <span>Tính kỳ kinh nguyệt</span>
                                    </Link>
                                </div>
                                <div className={cx('item-heart')}>
                                    <img src={require('../../assets/heartitem.png')} alt="" />
                                    <Link to="">
                                        <span>Công cụ đo nhịp tim</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-8', 'left-ccc')}>
                            <h3>Nổi bật</h3>
                            <div className={cx('list-cc')}>
                                <div className={cx('col-md-4', 'item-ccnb')}>
                                    <Link to="">
                                        <div className={cx('item__content')}></div>
                                    </Link>
                                </div>
                                <div className={cx('col-md-4', 'item-ccnb')}>
                                    <Link to="">
                                        <div className={cx('item__content1')}></div>
                                    </Link>
                                </div>
                                <div className={cx('col-md-4', 'item-ccnb')}>
                                    <Link to="">
                                        <div className={cx('item__content2')}></div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default CategoryItem;
