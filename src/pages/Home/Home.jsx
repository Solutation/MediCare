import React from 'react';
import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import { Button } from '~/components/Button';

const cx = classNames.bind(styles);

function Home() {
    return (
        <>
            <section id="homeHeader" className={cx('wrapper')}>
                <div className={cx('container', 'h-100')}>
                    <div className={cx('row')}>
                        <div className={cx('col-4', 'wrapper-item', 'offset-1', 'text-center')}>
                            <h1 className={cx('d-none', 'd-sm-block', 'title')}>Your health is</h1>
                            <h1 className={cx('d-none', 'd-sm-block', 'title', 'primary-text')}>our mission</h1>
                            <div className={cx('separate')}></div>
                            <p className={cx('description')}>
                                Chúng tôi luôn đưa ra các lời khuyên hợp lý từ các chuyên gia tư vấn hàng đầu, giúp cải
                                thiện sức khỏe của bạn cũng như cung cấp thêm cho bạn các thông tin về những bệnh lý
                                thường gặp.
                            </p>
                            <Button primary className={cx('w-50', 'mx-auto')}>
                                Liên hệ tư vấn ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="service">
                <div className={cx('container')}>
                    <h1>Our Service</h1>
                    <div className={cx('separate')}></div>
                    <div className={cx('row')}>
                        <div className={cx('col-md-3', 'col-sm-2')}>
                            <div className={cx('card')}>
                                <div className={cx('card-body')}>
                                    <h2 className={cx('card-title')}>Consultations</h2>
                                    <p className={cx('card-text')}>
                                        Với đội ngũ chuyên gia tư vấn giàu kinh nghiệm, chúng tôi luôn đưa ra những lời
                                        khuyên, tư vấn hợp lý để giúp cho các bệnh nhân khắc phục các vấn đề về sức khỏe
                                        của mình.
                                    </p>
                                    <Button primary rounded>
                                        Tìm hiểu thêm
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
