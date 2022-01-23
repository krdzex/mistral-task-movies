import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeHeaderInputValue } from '../Actions';

const Header = () => {
    const dispatch = useDispatch()
    const inputValue = useSelector(state => state.headerInputReducer)
    const onChangeHandler = (e) => {
        dispatch(changeHeaderInputValue(e.target.value))
    }
    return (
        <div className="headerWrapper">
            <div className='headerTitle'>
                <h2>IMDB</h2>
            </div>
            <div className='search'>
                <input placeholder='Search movies or tv shows...' className="input" value={inputValue} onChange={onChangeHandler} />
            </div>
        </div>
    );
};

export default Header;