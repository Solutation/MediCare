import React from 'react';
import ReactStars from 'react-stars';

const Rating = ({ handleRating, value }) => {
    return <ReactStars count={5} onChange={handleRating} size={30} half={true} value={value} />;
};

export default Rating;
