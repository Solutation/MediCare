import React from 'react';
import classNames from 'classnames/bind';
import { Navigator } from '~/components/Navigator';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Pagination } from './components/Pagination';

import styles from './ProfessorList.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const ProfessorList = () => {
    const { t } = useTranslation('professorlist');

    const pageItem = [{ id: 1, name: t('professor'), to: '' }];

    const images = {
        doctor1: require('~/assets/doctor1.jpg')
    };

    const result = [
        {
            id: 1,
            role: 'Cosmetic Surgeon',
            name: 'Lâm Khương Trí',
            description: 'Donec varius libero tortor, eu luctus ipsum aliquet ut.',
            image: images.doctor1
        },
        {
            id: 2,
            role: 'Cosmetic Surgeon',
            name: 'Lâm Đăng Khoa',
            description: 'Donec varius libero tortor, eu luctus ipsum aliquet ut.',
            image: images.doctor1
        },
        {
            id: 3,
            role: 'Cosmetic Surgeon',
            name: 'phan',
            description:
                'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                'được ưu tiên',
            image: images.doctor1
        },
        {
            id: 4,
            role: 'Cosmetic Surgeon',
            name: 'phan',
            description:
                'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                'được ưu tiên',
            image: images.doctor1
        },
        {
            id: 5,
            role: 'Cosmetic Surgeon',
            name: 'hoàng',
            description:
                'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                'được ưu tiên',
            image: images.doctor1
        },
        {
            id: 6,
            role: 'Cosmetic Surgeon',
            name: 'viết anh',
            description:
                'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                'được ưu tiên',
            image: images.doctor1
        },
        {
            id: 7,
            role: 'Cosmetic Surgeon',
            name: 'viết anh',
            description:
                'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                'được ưu tiên',
            image: images.doctor1
        },
        {
            id: 8,
            role: 'Cosmetic Surgeon',
            name: 'viết anh',
            description:
                'Mắt là một trong những cơ quan cảm giác phát triển nhất trong cơ thể. Ta phụ thuộc vào thị lực để có' +
                'thể thực hiện hầu hết các hoạt động hàng ngày. Vì vậy, việc duy trì sức khỏe đôi mắt tốt là điều cần' +
                'được ưu tiên',
            image: images.doctor1
        }
    ];
    const [searchValue, setSearchValue] = useState('');
    const handleOnChangeSearch = (e) => {
        setSearchValue(e.target.value);
    };
    return (
        <>
            <Navigator title={t('professor')} page={pageItem} bgPrimaryBold />
            <div className={cx('wrapper')}>
                <div className={cx('professor-header')}>
                    <h3 className={cx('header', 'text-center')}>{t('title')}</h3>
                    <div className={cx('search-wrapper')}>
                        <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                        <input
                            className={cx('categories-search', 'form-control')}
                            type="search"
                            placeholder={t('search')}
                            aria-label="Search"
                            value={searchValue}
                            onChange={handleOnChangeSearch}
                        ></input>
                    </div>
                </div>
                <div className={cx('container')}>
                    <div className={cx('row')}>
                        <div className={cx('professor-wrapper', 'd-flex', 'flex-wrap')}>
                            {result.filter((item) => {
                                return item.name.toLowerCase().includes(searchValue);
                            }).length > 0 ? (
                                result
                                    .filter((item) => {
                                        return item.name.toLowerCase().includes(searchValue);
                                    })
                                    .map((item) => (
                                        <div
                                            className={cx('col-sm-6', 'col-md-3', 'col-ms-12', 'professor-item')}
                                            key={item.id}
                                        >
                                            <Link to="">
                                                <div className={cx('professor-content')}>
                                                    <img
                                                        src={item.image}
                                                        alt="Anh"
                                                        className={cx('professor-image')}
                                                    ></img>
                                                    <div className={cx('professor-info')}>
                                                        <div className={cx('professor-role')}>{item.role}</div>
                                                        <div className={cx('professor-name')}>{item.name}</div>
                                                        <div className={cx('professor-description')}>
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))
                            ) : (
                                <p>Không tìm thấy</p>
                            )}
                        </div>
                    </div>
                    <Pagination></Pagination>
                </div>
            </div>
        </>
    );
};

export default ProfessorList;
