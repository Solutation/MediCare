import React from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './ArticleDetail.module.scss';
import { Button } from '~/components/Button';
import { faArrowRight, faChevronRight, faHouseMedical } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import images from '~/assets';

const cx = classNames.bind(styles);

function ArticleDetail() {
    return (
        <>
            <section id="articleDetailHeader" className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('d-sm-block', 'wrapper-item', 'text-center')}>
                        <h1 className={cx('title')}>TIN TỨC</h1>
                        <div className={cx('d-sm-block', 'navigator-wrapper')}>
                            <Link to="">
                                <FontAwesomeIcon icon={faHouseMedical} className={cx('white', 'home-icon')} />
                            </Link>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('white', 'arrow-icon')} />
                            <h3 className={cx('navigator-item')}>Tin tức</h3>
                            <FontAwesomeIcon icon={faChevronRight} className={cx('white', 'arrow-icon')} />
                            <h3 className={cx('navigator-item')}>Tin tức</h3>
                        </div>
                    </div>
                </div>
            </section>
            <section id="article">
                <div className={cx('container', 'flex-wrap')}>
                    <div className={cx('row', 'mx-auto', 'd-flex')}>
                        <div className={cx('col-7', 'offset-1', 'article-content')}>
                            <div className={cx('article-wrapper')}>
                                <h1 className={cx('article-title')}>Các bác sĩ giải thích về cuồng dâm.</h1>
                                <div className={cx('article-time')}>Thứ 6, 23/09/2022 - 7:00 (GMT + 7)</div>
                                <p>
                                    TTO - Nhiều người nghĩ rằng cuồng dâm là do suy đồi đạo đức nhưng đây là biểu hiện
                                    của bệnh rối loạn tâm thần hoặc do gene. Bên cạnh đó, có thể do tác dụng phụ của một
                                    số loại thuốc, sử dụng chất hoặc là biểu hiện của bệnh lý sa sút trí tuệ.
                                </p>
                                <p>
                                    Đây là thông tin bác sĩ Nguyễn Thị Phương Mai - phòng điều trị rối loạn liên quan
                                    stress và sức khỏe tình dục, Viện Sức khỏe tâm thần, Bệnh viện Bạch Mai - chia sẻ
                                    tại hội thảo Xu hướng tình dục quá mức, chiều 20-9 tại Bệnh viện Bạch Mai.
                                </p>
                                <img
                                    src={require('../../assets/article1.jpg')}
                                    alt="Anh"
                                    className={cx('article-image')}
                                ></img>
                                <h3>Cuồng dâm vì quan điểm tình dục lệch lạc</h3>
                                <p>
                                    TS Trịnh Thanh Hương (Viện Sức khỏe tâm thần, Bệnh viện Bạch Mai) chia sẻ về trường
                                    hợp nữ bệnh nhân 20 tuổi phải điều trị tâm lý gần 6 tháng vì xu hướng tình dục quá
                                    mức.
                                </p>
                                <p>
                                    Cô gái từng là nạn nhân của lạm dụng tình dục, sau đó cô có suy nghĩ lệch lạc rằng
                                    mình không còn gì để "mất" nên đã quan hệ tình dục với nhiều người. Sau đó hình
                                    thành thói quen, sự ham muốn tình dục và nhu cầu quan hệ tình dục ngày càng gia
                                    tăng.
                                </p>
                                <p>
                                    "Cô gái này tìm kiếm bạn tình và thay đổi bạn tình liên tục. Sau đó số lần quan hệ
                                    ngày càng nhiều hơn nhưng vẫn không thỏa mãn. Mỗi ngày cô gái này quan hệ tình dục
                                    3-5 lần và luôn nghĩ đến việc quan hệ tình dục, gây ảnh hưởng đến cuộc sống. Sau đó
                                    cô nhận thấy sự bất thường về tâm lý và tìm đến bác sĩ để tư vấn", TS Hương cho hay.
                                </p>
                            </div>
                            <div className={cx('carousel-professor')}>
                                <div
                                    id="carouselExampleDark"
                                    class="carousel carousel-dark slide"
                                    data-bs-ride="carousel"
                                >
                                    <div class="carousel-indicators">
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleDark"
                                            data-bs-slide-to="0"
                                            class="active"
                                            aria-current="true"
                                            aria-label="Slide 1"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleDark"
                                            data-bs-slide-to="1"
                                            aria-label="Slide 2"
                                        ></button>
                                        <button
                                            type="button"
                                            data-bs-target="#carouselExampleDark"
                                            data-bs-slide-to="2"
                                            aria-label="Slide 3"
                                        ></button>
                                    </div>
                                    <div class="carousel-inner">
                                        <div class="carousel-item active" data-bs-interval="10000">
                                            <div className={cx('professor-card')}>
                                                <div className={cx('professor-image')}>
                                                    <img
                                                        src={require('../../assets/doctor1.jpg')}
                                                        alt="Anh"
                                                        className={cx('professor-image')}
                                                    ></img>
                                                </div>
                                                <div className={cx('professor-info')}>
                                                    <div className={cx('about-professor')}>Chuyên Gia Liên Quan</div>
                                                    <h3>Họ Tên: Ngọc Phan</h3>
                                                    <h3>Chuyên khoa: Răng hàm mặt</h3>
                                                    <h3>SĐT: 0123456789</h3>

                                                    <Button
                                                        primary
                                                        rounded
                                                        rightIcon={
                                                            <FontAwesomeIcon
                                                                icon={faArrowRight}
                                                                className={cx('px-2')}
                                                            />
                                                        }
                                                    >
                                                        Xem thông tin
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="carousel-item" data-bs-interval="2000">
                                            <div className={cx('professor-card')}>
                                                <div className={cx('professor-image')}>
                                                    <img
                                                        src={require('../../assets/doctor2.jpg')}
                                                        alt="Anh"
                                                        className={cx('professor-image')}
                                                    ></img>
                                                </div>
                                                <div className={cx('professor-info')}>
                                                    <div className={cx('about-professor')}>Chuyên Gia Liên Quan</div>
                                                    <h3>Họ Tên: Khương Trí</h3>
                                                    <h3>Chuyên khoa: Sản phụ</h3>
                                                    <h3>SĐT: 0987654321</h3>

                                                    <Button
                                                        primary
                                                        rounded
                                                        rightIcon={
                                                            <FontAwesomeIcon
                                                                icon={faArrowRight}
                                                                className={cx('px-2')}
                                                            />
                                                        }
                                                    >
                                                        Xem thông tin
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="carousel-item">
                                            <div className={cx('professor-card')}>
                                                <div className={cx('professor-image')}>
                                                    <img
                                                        src={require('../../assets/doctor3.jpg')}
                                                        alt="Anh"
                                                        className={cx('professor-image')}
                                                    ></img>
                                                </div>
                                                <div className={cx('professor-info')}>
                                                    <div className={cx('about-professor')}>Chuyên Gia Liên Quan</div>
                                                    <h3>Họ Tên: Đăng Khoa</h3>
                                                    <h3>Chuyên khoa: Xương khớp</h3>
                                                    <h3>SĐT: 0987123456</h3>

                                                    <Button
                                                        primary
                                                        rounded
                                                        rightIcon={
                                                            <FontAwesomeIcon
                                                                icon={faArrowRight}
                                                                className={cx('px-2')}
                                                            />
                                                        }
                                                    >
                                                        Xem thông tin
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        class="carousel-control-prev"
                                        type="button"
                                        data-bs-target="#carouselExampleDark"
                                        data-bs-slide="prev"
                                    >
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button
                                        class="carousel-control-next"
                                        type="button"
                                        data-bs-target="#carouselExampleDark"
                                        data-bs-slide="next"
                                    >
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('col-3', 'side-bar')}>
                            <div className={cx('news-list', 'd-block')}>
                                <h3 className={cx('primary', 'mt-2')}>Tin Tức Liên Quan</h3>
                                <div className={cx('news-wrapper')}>
                                    <div className={cx('news', 'd-flex')}>
                                        <img
                                            src={require('../../assets/news.jpg')}
                                            alt="Anh"
                                            className={cx('news-image')}
                                        ></img>
                                        <div className={cx('news-info')}>
                                            <div className={cx('news-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('news-title')}>
                                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('news-wrapper')}>
                                    <div className={cx('news', 'd-flex')}>
                                        <img
                                            src={require('../../assets/news.jpg')}
                                            alt="Anh"
                                            className={cx('news-image')}
                                        ></img>
                                        <div className={cx('news-info')}>
                                            <div className={cx('news-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('news-title')}>
                                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('news-wrapper')}>
                                    <div className={cx('news', 'd-flex')}>
                                        <img
                                            src={require('../../assets/news.jpg')}
                                            alt="Anh"
                                            className={cx('news-image')}
                                        ></img>
                                        <div className={cx('news-info')}>
                                            <div className={cx('news-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('news-title')}>
                                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('news-wrapper')}>
                                    <div className={cx('news', 'd-flex')}>
                                        <img
                                            src={require('../../assets/news.jpg')}
                                            alt="Anh"
                                            className={cx('news-image')}
                                        ></img>
                                        <div className={cx('news-info')}>
                                            <div className={cx('news-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('news-title')}>
                                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('news-wrapper')}>
                                    <div className={cx('news', 'd-flex')}>
                                        <img
                                            src={require('../../assets/news.jpg')}
                                            alt="Anh"
                                            className={cx('news-image')}
                                        ></img>
                                        <div className={cx('news-info')}>
                                            <div className={cx('news-datetime')}>
                                                <FontAwesomeIcon icon={faClock} className={cx('disease-date-icon')} />
                                                <span className={cx('px-3')}>August 8, 2022</span>
                                            </div>
                                            <div className={cx('news-title')}>
                                                <h3>Thực đơn hàng ngày cho 1 tháng đầy đủ dinh dưỡng</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('tags', 'd-block')}>
                                <h3 className={cx('primary', 'mt-2')}>Nhãn</h3>
                                <ul className={cx('tag-list')}>
                                    <li>
                                        <a href="#">Sinh lý (5)</a>
                                    </li>
                                    <li>
                                        <a href="#">Xương khớp (8)</a>
                                    </li>
                                    <li>
                                        <a href="#">Răng hàm mặt (2)</a>
                                    </li>
                                    <li>
                                        <a href="#">Thị giác (2)</a>
                                    </li>
                                    <li>
                                        <a href="#">Ung thư (6)</a>
                                    </li>
                                    <li>
                                        <a href="#">Hô hấp (3)</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ArticleDetail;
