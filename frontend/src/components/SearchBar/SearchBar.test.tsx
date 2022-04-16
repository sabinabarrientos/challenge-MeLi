import React  from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import { BrowserRouter } from 'react-router-dom';
import SearchBar, { SearchBarProps } from './SearchBar';

describe( 'SearchBar', () => {
    let wrapper: RenderResult;

    const mockSearchBarProps: SearchBarProps = {
        onInputChange: ()=> alert( 'new search' ),
        onClickHandler: ()=> alert( 'logo clicked' )
    };

    const getRender = ( mockSearchBarProps: SearchBarProps ): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <SearchBar
                        onInputChange={mockSearchBarProps.onInputChange}
                        onClickHandler={mockSearchBarProps.onClickHandler}/>
                </SearchProvider>
            </BrowserRouter> );
    };

    afterEach( () => {
        cleanup();
    });

    beforeEach( async ()=>{
        window.alert = jest.fn();
        await act( ()=> {
            wrapper = getRender( mockSearchBarProps );
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-search-bar' );
        const logo = wrapper.container.querySelector( '.sid-search-bar__logo-container' );
        const input = wrapper.container.querySelector( '.sid-search-bar__input' );

        expect( element ).toBeInTheDocument();
        expect( logo ).toBeInTheDocument();
        expect( input ).toBeInTheDocument();
    });

});
