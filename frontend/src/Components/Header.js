import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeHeaderInputValue, changeSwitchValue } from '../Actions';
import Switch from "react-switch"
import Authentication from './Authentication';
const Header = () => {
    const dispatch = useDispatch()
    const inputValue = useSelector(state => state.headerInputReducer)
    const swtichValue = useSelector(state => state.switchValueReducer)
    const onChangeHandler = (e) => {
        dispatch(changeHeaderInputValue(e.target.value))
    }

    return (
        <div className="headerWrapper">
            <div className='headerTitle'>
                <h2>IMDB</h2>
            </div>
            <div className='search'>
                <div className='switchWrapper'>
                    <h3>Movies</h3>
                    <Switch className='react-switch' onChange={() => dispatch(changeSwitchValue(!swtichValue))} checked={swtichValue} offColor='#D5D5D5' onColor='#D5D5D5' checkedIcon={false} uncheckedIcon={false} offHandleColor="#808080" onHandleColor="#808080" />
                    <h3>Tv Shows</h3>
                </div>
                <input placeholder='Search movies or tv shows...' className="input" value={inputValue} onChange={onChangeHandler} />
                <Authentication />
            </div>
        </div>
    );
};

export default Header;