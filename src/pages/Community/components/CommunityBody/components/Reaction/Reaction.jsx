import React from 'react';
import classNames from 'classnames/bind';

import styles from './Reaction.module.scss';
import LikeIcon from '~/assets/like.png';
import LoveIcon from '~/assets/love.png';
import DottedIcon from '~/assets/dotted.png';
import HahaIcon from '~/assets/haha.png';
import SurpriseIcon from '~/assets/surprise.png';
import CryIcon from '~/assets/haha.png';
import AngryIcon from '~/assets/angry.png';

const cx = classNames.bind(styles);

const reactionList = [
    { id: 1, icon: LikeIcon },
    { id: 2, icon: LoveIcon },
    { id: 3, icon: DottedIcon },
    { id: 4, icon: HahaIcon },
    { id: 5, icon: SurpriseIcon },
    { id: 6, icon: CryIcon },
    { id: 7, icon: AngryIcon }
];

const Reaction = ({ tippyInstance }) => {
    const handleHideTippy = () => {
        tippyInstance.hide();
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('p-3', 'd-flex', 'align-items-center', 'h-100')}>
                {reactionList &&
                    reactionList.map((reactionItem) => (
                        <div className={cx('reaction_item_wrapper')} key={reactionItem.id} onClick={handleHideTippy}>
                            <img src={reactionItem.icon} alt="" />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Reaction;
