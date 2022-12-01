import React from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './DiseaseItem.module.scss';

const cx = classNames.bind(styles);

const DiseaseItem = ({ data, tippyInstance, setSearchValue }) => {
    const navigate = useNavigate();

    const handleDiseaseClick = (diseaseItemId) => {
        tippyInstance.hide();
        setSearchValue('');
        navigate(`/news?articleId=${diseaseItemId}`);
    };

    return (
        <>
            {data.length > 0 &&
                data.map((diseaseItem) => (
                    <div
                        className={cx('wrapper')}
                        key={diseaseItem.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDiseaseClick(diseaseItem.id)}
                    >
                        <img src={diseaseItem.image_article} className={cx('disease-image')} alt="Anh" />
                        <div className={cx('disease-info')}>
                            <h4 className={cx('disease-name')}>
                                <span className={cx('disease-title')}>
                                    {diseaseItem.title.length > 35
                                        ? diseaseItem.title.slice(0, 35) + '...'
                                        : diseaseItem.title}
                                </span>
                            </h4>
                            <span className={cx('disease-description')}>{diseaseItem.content.slice(0, 70) + '..'}</span>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default DiseaseItem;
