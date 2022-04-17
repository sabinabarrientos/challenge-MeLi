import React  from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { defaultSearchResults, SearchProvider } from '../../providers/Search.provider';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';
import { mockedUsedNavigate } from '../../setupTests';
import SearchService from '../../services/Search.service';
import { ItemsResult } from '../../models/Result.model';

describe( 'HomePage', () => {
    let wrapper: RenderResult,
        getProductsSpy: jest.SpyInstance<Promise<ItemsResult>>;

    const getRender = (): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <HomePage/>
                </SearchProvider>
            </BrowserRouter>
        );
    };

    afterEach( () => {
        getProductsSpy.mockClear();
    });

    beforeAll( () => {
        getProductsSpy = jest.spyOn( SearchService, 'getProducts' );
    });

    beforeEach( async ()=>{
        getProductsSpy.mockReturnValue( Promise.resolve( defaultSearchResults ) );
        await act( ()=> {
            wrapper = getRender();
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-home-page' );
        expect( element ).toBeInTheDocument();
    });

    test( 'Should redirect to homepage', async ()=> {
        const logo = wrapper.container.querySelector( '.search-bar__logo-img' );
        expect( logo ).toBeInTheDocument();

        if ( logo ) {
            await act( () => {
                fireEvent.click( logo );
                return Promise.resolve();
            });
        }

        expect( mockedUsedNavigate ).toHaveBeenCalledWith( SearchService.states.home );

    });

    test( 'Should call service on new search term', async ()=> {
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

        expect( mockedUsedNavigate ).toHaveBeenCalledWith( SearchService.states.search );

    });
});
