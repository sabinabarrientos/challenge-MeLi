import React, { useState } from 'react';
import LogoML from '../../assets/Logo_ML@2x.png.png'
import SearchIcon from '../../assets/ic_Search@2x.png.png'
import './SearchBar.scss'

interface SearchBarProps {
    onInputChange: Function;
    onClickHandler: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onInputChange, onClickHandler }): JSX.Element => {

    const [query, setQuery] = useState('');

    const homeRedirect = () => {
        onClickHandler();
        setQuery('')
    }

    return (

        <div>
            <div className='search-bar'>

                <div className='search-bar__logo-container'>
                    <img className='search-bar__logo-img' onClick={homeRedirect} src={LogoML} alt='logo-meli' />
                </div>

                <input
                    className='search-bar__input'
                    placeholder="Nunca dejes de buscar"
                    aria-label='Nunca dejes de buscar'
                    value={query}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setQuery(e.target.value); }}
                />

                <div className='search-bar__icon' onClick={() => {
                    onInputChange(query)
                }}>
                    <img className='search-bar__logo-search' src={SearchIcon} alt='logo-meli' />
                </div>

            </div>
        </div>
    )
}

export default SearchBar;

