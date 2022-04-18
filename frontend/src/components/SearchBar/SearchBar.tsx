import React, { useState } from 'react';
import LogoML from '../../assets/Logo_ML@2x.png.png';
import SearchIcon from '../../assets/ic_Search@2x.png.png';
import './SearchBar.scss';

export interface SearchBarProps {
    // eslint-disable-next-line @typescript-eslint/ban-types
    onInputChange: Function;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onClickHandler: Function;
}

const SearchBar: React.FC<SearchBarProps> = ({ onInputChange, onClickHandler }): JSX.Element => {

    const [ query, setQuery ] = useState( '' );

    const homeRedirect = (): void => {
        onClickHandler();
        setQuery( '' );
    };

    const searchValue = (): void => {
        onInputChange( query );
    };

    const submitHandler = ( e: React.KeyboardEvent ): void => {
        if ( e.key === 'Enter' ) {
            onInputChange( query );
            setQuery( '' );
        }
    };

    return (

        <div>
            <div className='sid-search-bar search-bar'>

                <div className='sid-search-bar__logo-container search-bar__logo-container'>
                    <img
                        className='search-bar__logo-img'
                        onClick={homeRedirect}
                        src={LogoML}
                        alt='logo-mercado-libre'
                    />
                </div>

                <input
                    className='sid-search-bar__input search-bar__input'
                    placeholder="Nunca dejes de buscar"
                    aria-label='Nunca dejes de buscar'
                    value={query}
                    onKeyUp={( e: React.KeyboardEvent ): void => { submitHandler( e ); }}
                    onChange={ ( e: React.ChangeEvent<HTMLInputElement> ): void => { setQuery( e.target.value ); }}
                />

                <div className='sid-search-bar__icon search-bar__icon' onClick={searchValue}>
                    <img
                        aria-label='buscador'
                        role='button'
                        className='sid-search-bar__logo-search search-bar__logo-search'
                        src={SearchIcon}
                        alt='buscar'
                    />
                </div>

            </div>
        </div>
    );
};

export default SearchBar;
