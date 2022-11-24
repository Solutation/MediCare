import React from 'react';
import classNames from 'classnames/bind';
import styles from './BlogNew.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import images from '~/assets';
import { faChevronRight, faHome } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function BlogNew() {
    const { t } = useTranslation('BlogNew');
    return (
        <>
            <section action className={cx('left-blognew1')}>
                <div className={cx('container')}>
                    <div className={cx('row', 'title__news')}>
                        <div className={cx('div1')}>
                            <img src={require('../../assets/eyes.png')} alt="" />
                            <h3>Sức Khỏe răng miệng</h3>
                        </div>
                        <div className={cx('div2', 'col-6')}>
                            <p>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente itaque velit cumque
                                inventore at saepe. Aliquid mollitia explicabo voluptatibus suscipit debitis a
                                distinctio doloribus cupiditate earum ipsa ut, nisi quaerat!
                            </p>
                        </div>
                    </div>
                    <div className={cx('row')}>
                        <h2 className={cx('h2-bvmn')}>{t('BlogNew')}</h2>
                        <div className={cx('col-md-6', 'left-bvnb')}>
                            <img src={require('../../assets/blognew1.jpg')} alt="" />
                            <div className={cx('content-blognew1')}>
                                <h2>
                                    <Link to="" className={cx('hv')}>
                                        Uống cafe bị đau bụng - "Truy tìm" nguyên nhân và cách ngăn ngừa
                                    </Link>
                                </h2>
                            </div>
                        </div>
                        <div className={cx('col-md-6')}>
                            <div className={cx('row')}>
                                <div className={cx('col-12', 'right-bvnb')}>
                                    <img src={require('../../assets/blognew2.jpg')} alt="" />
                                    <div className={cx('content-blognew1')}>
                                        <h2>
                                            <Link to="" className={cx('hv')}>
                                                Uống cafe bị đau bụng - "Truy tìm" nguyên nhân và cách ngăn ngừa
                                            </Link>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-6', 'right-bvnb-1')}>
                                    <img src={require('../../assets/blognew3.jpg')} alt="" />
                                    <div className={cx('content-blognew1')}>
                                        <h2>
                                            <Link to="" className={cx('hv')}>
                                                Uống cafe bị đau bụng - "Truy tìm" nguyên nhân và cách ngăn ngừa
                                            </Link>
                                        </h2>
                                    </div>
                                </div>
                                <div className={cx('col-6', 'right-bvnb-1')}>
                                    <img src={require('../../assets/blognew4.jpg')} alt="" />
                                    <div className={cx('content-blognew1')}>
                                        <h2>
                                            <Link to="" className={cx('hv')}>
                                                Uống cafe bị đau bụng - "Truy tìm" nguyên nhân và cách ngăn ngừa
                                            </Link>
                                        </h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={cx('sc-bottom')}>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('col-md-8')}>
                            <ul className={cx('ul-chuyenhuong', 'd-flex')}>
                                <li>
                                    <FontAwesomeIcon icon={faHome} />
                                </li>
                                <li>
                                    <Link to="" className={cx('home')}>
                                        {t('Home')}
                                    </Link>
                                </li>

                                <li>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </li>
                                <li>
                                    <p>Tin tức</p>
                                </li>
                            </ul>
                            <div className={cx('row')}>
                                <div className={cx('col-md-12', 'mg-0')}>
                                    <ul className={cx('title-chuyenmuc', 'd-flex')}>
                                        <li>
                                            <h2>Ung thư - Ung bướu</h2>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('row', 'content-baiviet')}>
                                    <div className={cx('col-5')}>
                                        <img
                                            className={cx('img-left-post')}
                                            src={require('../../assets/blognew7.jpg')}
                                            alt=""
                                        />
                                    </div>
                                    <div className={cx('col-7')}>
                                        <Link to="">
                                            <h3 className={cx('title-baiviet')}>
                                                Thực đơn tốt cho sức khỏe nên và không nên có những loại thực phẩm...
                                            </h3>
                                        </Link>
                                        <p>
                                            Bên cạnh rất nhiều các chế độ ăn uống theo độ tuổi, theo nhu cầu giảm cân…
                                            bạn đã nắm được những quy tắc cơ bản để có một thực đơn tốt ...
                                        </p>
                                        <ul className={cx('title-chuyenmuc', 'd-flex')}>
                                            <li>
                                                <Link className={cx('xt')} to="">
                                                    {t('More')}
                                                </Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={cx('row', 'content-baiviet')}>
                                    <div className={cx('col-5')}>
                                        <img src={require('../../assets/blognew7.jpg')} alt="" />
                                    </div>
                                    <div className={cx('col-7')}>
                                        <Link to="">
                                            <h3 className={cx('title-baiviet')}>
                                                Thực đơn tốt cho sức khỏe nên và không nên có những loại thực phẩm...
                                            </h3>
                                        </Link>
                                        <p>
                                            Bên cạnh rất nhiều các chế độ ăn uống theo độ tuổi, theo nhu cầu giảm cân…
                                            bạn đã nắm được những quy tắc cơ bản để có một thực đơn tốt ...
                                        </p>
                                        <ul className={cx('title-chuyenmuc', 'd-flex')}>
                                            <li>
                                                <Link className={cx('xt')} to="">
                                                    {t('More')}
                                                </Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-md-12', 'mg-0')}>
                                    <ul className={cx('title-chuyenmuc', 'd-flex')}>
                                        <li>
                                            <h2>Ung thư - Ung bướu</h2>
                                        </li>
                                    </ul>
                                </div>
                                <div className={cx('row', 'content-baiviet')}>
                                    <div className={cx('col-5')}>
                                        <img src={require('../../assets/blognew7.jpg')} alt="" />
                                    </div>
                                    <div className={cx('col-7')}>
                                        <Link to="">
                                            <h3 className={cx('title-baiviet')}>
                                                Thực đơn tốt cho sức khỏe nên và không nên có những loại thực phẩm...
                                            </h3>
                                        </Link>
                                        <p>
                                            Bên cạnh rất nhiều các chế độ ăn uống theo độ tuổi, theo nhu cầu giảm cân…
                                            bạn đã nắm được những quy tắc cơ bản để có một thực đơn tốt ...
                                        </p>
                                        <ul className={cx('title-chuyenmuc', 'd-flex')}>
                                            <li>
                                                <Link className={cx('xt')} to="">
                                                    {t('More')}
                                                </Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={cx('row', 'content-baiviet')}>
                                    <div className={cx('col-5')}>
                                        <img src={require('../../assets/blognew7.jpg')} alt="" />
                                    </div>
                                    <div className={cx('col-7')}>
                                        <Link to="">
                                            <h3 className={cx('title-baiviet')}>
                                                Thực đơn tốt cho sức khỏe nên và không nên có những loại thực phẩm...
                                            </h3>
                                        </Link>
                                        <p>
                                            Bên cạnh rất nhiều các chế độ ăn uống theo độ tuổi, theo nhu cầu giảm cân…
                                            bạn đã nắm được những quy tắc cơ bản để có một thực đơn tốt ...
                                        </p>
                                        <ul className={cx('title-chuyenmuc', 'd-flex')}>
                                            <li>
                                                <Link className={cx('xt')} to="">
                                                    {t('More')}
                                                </Link>
                                            </li>
                                            <li>
                                                <FontAwesomeIcon icon={faChevronRight} />
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-md-4', 'vien-bd')}>
                            <div className={cx('row')}>
                                <div className={cx('title-bvnb')}>
                                    <div className={cx('Fpost')}>
                                        <h2>{t('FeaturedPost')}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('row')}>
                                <div className={cx('col-12', 'right-bvnb')}>
                                    <img src={require('../../assets/blognew2.jpg')} alt="" />
                                    <div className={cx('content-blognew1')}>
                                        <Link to="">
                                            <h2>Uống cafe bị đau bụng - "Truy tìm" nguyên nhân và cách ngăn ngừa</h2>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('row', 'right-bvn')}>
                                <div className={cx('col-5')}>
                                    <img src={require('../../assets/blognew6.jpg')} alt="" />
                                </div>
                                <div className={cx('col-7')}>
                                    <Link to="">
                                        <p>Bệnh đa xơ cứng có chữa được không? Triển vọng cho người bệnh</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('row', 'right-bvn')}>
                                <div className={cx('col-5')}>
                                    <img src={require('../../assets/blognew3.jpg')} alt="" />
                                </div>
                                <div className={cx('col-7')}>
                                    <Link to="">
                                        <p>Bệnh đa xơ cứng có chữa được không? Triển vọng cho người bệnh</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('row', 'right-bvn')}>
                                <div className={cx('col-5')}>
                                    <img src={require('../../assets/blognew4.jpg')} alt="" />
                                </div>
                                <div className={cx('col-7')}>
                                    <Link to="">
                                        <p>Bệnh đa xơ cứng có chữa được không? Triển vọng cho người bệnh</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={cx('row', 'right-bvn')}>
                                <div className={cx('col-5')}>
                                    <img src={require('../../assets/blognew5.jpg')} alt="" />
                                </div>
                                <div className={cx('col-7')}>
                                    <Link to="">
                                        <p>Bệnh đa xơ cứng có chữa được không? Triển vọng cho người bệnh</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default BlogNew;
