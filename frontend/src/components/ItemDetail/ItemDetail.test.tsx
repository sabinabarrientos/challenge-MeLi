import React  from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider, defaultItemDetailResult, defaultSearchResults } from '../../providers/Search.provider';
import { BrowserRouter } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import SearchService from '../../services/Search.service';
import { ItemDetailResult, ItemsResult } from '../../models/Result.model';
import { mockedUsedNavigate } from '../../setupTests';

describe( 'ItemDetail', () => {
    let wrapper: RenderResult,
        getItemDetailSpy: jest.SpyInstance<Promise<ItemDetailResult>>,
        getProductsSpy: jest.SpyInstance<Promise<ItemsResult>>;

    const getRender = (): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <ItemDetail/>
                </SearchProvider>
            </BrowserRouter> );
    };

    afterEach( () => {
        getItemDetailSpy.mockClear();
        getProductsSpy.mockClear();
        cleanup();
    });

    beforeAll( () => {
        getItemDetailSpy = jest.spyOn( SearchService, 'getItemDetail' );
        getProductsSpy = jest.spyOn( SearchService, 'getProducts' );
    });

    beforeEach( async ()=>{
        getItemDetailSpy.mockReturnValue( Promise.resolve( defaultItemDetailResult ) );
        getProductsSpy.mockReturnValue( Promise.resolve( defaultSearchResults ) );

        await act( ()=> {
            wrapper = getRender();
            return Promise.resolve();
        });

    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-item-detail' );

        expect( element ).toBeInTheDocument();
    });

    test( 'Should call service', ()=> {
        const element = wrapper.container.querySelector( '.sid-item-detail' );

        expect( element ).toBeInTheDocument();
        expect( getItemDetailSpy ).toHaveBeenCalled();
    });

    test( 'Should render service response', ()=> {
        const info = wrapper.container.querySelector( '.sid-item-detail__info' );
        const aside = wrapper.container.querySelector( '.sid-item-detail__aside' );
        const description = wrapper.container.querySelector( '.sid-item-detail__description ' );

        expect( info ).toBeInTheDocument();
        expect( aside ).toBeInTheDocument();
        expect( description ).toBeInTheDocument();
    });

    test( 'Should call service on new search term', async () => {
        const input = wrapper.container.querySelector( '.sid-search-bar__input' );
        const submitButton = wrapper.container.querySelector( '.search-bar__logo-search' );

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

        expect( getProductsSpy ).toHaveBeenCalledWith( 'query' );
        expect( mockedUsedNavigate ).toHaveBeenCalledWith( `{ ${SearchService.states.search}?search=query` );
    });

    test( 'Should redirect to error page on item detail service error', async () => {
        await act( () => {
            getItemDetailSpy.mockReturnValue( Promise.reject() );
            wrapper = getRender();
            return Promise.resolve();
        });

        expect( mockedUsedNavigate ).toHaveBeenCalledWith(
            SearchService.states.error );
    });

    test( 'Should redirect to error page on get products service error', async () => {
        act( () => {
            getProductsSpy.mockReturnValue( Promise.reject() );
            wrapper = getRender();
            return Promise.resolve();
        });

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

        expect( getProductsSpy ).toHaveBeenCalledWith( 'query' );
        expect( mockedUsedNavigate ).toHaveBeenCalledWith( SearchService.states.error );

    });

    test( 'Should redirect to home page', async () => {
        const logo = wrapper.container.querySelector( '.sid-search-bar__logo-img' );
        expect( logo ).toBeInTheDocument();

        if ( logo ) {
            await act( () => {
                fireEvent.click( logo );
                return Promise.resolve();
            });
        }

        expect( mockedUsedNavigate ).toHaveBeenCalledWith( SearchService.states.home );

    });

});
