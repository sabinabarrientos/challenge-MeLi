import React  from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { defaultSearchResults, SearchProvider } from '../../providers/Search.provider';
import { BrowserRouter } from 'react-router-dom';
import SearchBar, { SearchBarProps } from './SearchBar';
import SearchService from '../../services/Search.service';
import { ItemsResult } from '../../models/Result.model';

describe( 'SearchBar', () => {
    let wrapper: RenderResult,
        getProductsSpy: jest.SpyInstance<Promise<ItemsResult>>;

    const mockSearchBarProps: SearchBarProps = {
        onInputChange: ()=> window.alert( 'new search' ),
        onClickHandler: ()=> window.alert( 'logo clicked' )
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
        getProductsSpy.mockClear();
    });

    beforeAll( () => {
        getProductsSpy = jest.spyOn( SearchService, 'getProducts' );
    });

    beforeEach( async ()=>{
        window.alert = jest.fn();
        getProductsSpy.mockReturnValue( Promise.resolve( defaultSearchResults ) );

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

    test( 'Should execute function on button clicked', async ()=> {
        const input = wrapper.container.querySelector( '.sid-search-bar__input' );
        const submitButton = wrapper.container.querySelector( '.sid-search-bar__logo-search' );
        expect( input ).toBeInTheDocument();
        expect( submitButton ).toBeInTheDocument();

        if ( input ) {
            await act( () => {
                fireEvent.change( input,  {
                    target: {
                        value: 'query'
                    }
                });
                return Promise.resolve();
            });
        }

        if ( submitButton ) {
            await act( () => {
                fireEvent.click ( submitButton );
            });
            return Promise.resolve();
        }

        expect( window.alert ).toHaveBeenCalled();

    });

    test( 'Should execute function on Enter key pressed', async ()=> {
        const input = wrapper.container.querySelector( '.sid-search-bar__input' );

        expect( input ).toBeInTheDocument();

        if ( input ) {
            await act( () => {
                fireEvent.change( input,  {
                    target: {
                        value: 'query'
                    }
                });
                return Promise.resolve();
            });
            fireEvent.keyUp( input, { key: 'Enter' });
        }

        expect( window.alert ).toHaveBeenCalled();

    });

    test( 'Should not execute function on any key pressed', async ()=> {
        const input = wrapper.container.querySelector( '.sid-search-bar__input' );

        expect( input ).toBeInTheDocument();

        if ( input ) {
            await act( () => {
                fireEvent.change( input,  {
                    target: {
                        value: 'query'
                    }
                });
                return Promise.resolve();
            });
            fireEvent.keyUp( input, { key: 'h' });
        }

        expect( window.alert ).not.toHaveBeenCalled();

    });

    test( 'Should execute function on logo clicked ', async ()=> {
        const logo = wrapper.container.querySelector( '.search-bar__logo-img' );
        expect( logo ).toBeInTheDocument();

        if ( logo ) {
            await act( () => {
                fireEvent.click ( logo );
            });
            return Promise.resolve();
        }

        expect( window.alert ).toHaveBeenCalled();

    });

});
