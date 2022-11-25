import React from 'react';
import ReactStars from 'react-stars';

const Rating = ({ handleRating }) => {
    return <ReactStars count={5} onChange={handleRating} size={30} half={true} />;
};

export default Rating;
