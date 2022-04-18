import React  from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { defaultSearchResults, SearchProvider } from '../../providers/Search.provider';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import SearchService from '../../services/Search.service';
import { ItemsResult } from '../../models/Result.model';
import { mockedUsedNavigate } from '../../setupTests';
import { OperationResult } from '../../enums/enums';

describe( 'Layout', () => {
    let wrapper: RenderResult,
        getProductsSpy: jest.SpyInstance<Promise<ItemsResult>>;

    const getRender = (): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <Layout/>
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
        getProductsSpy.mockReturnValue( Promise.resolve( defaultSearchResults ) );
        await act( ()=> {
            wrapper = getRender();
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-layout' );

        expect( element ).toBeInTheDocument();
    });

    test( 'Should call search service', ()=> {
        const element = wrapper.container.querySelector( '.sid-layout' );

        expect( element ).toBeInTheDocument();
        expect( getProductsSpy ).toHaveBeenCalled();
    });

    test( 'Should redirect to home page', async ()=> {
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

    test( 'Should redirect to error page', async ()=> {
        getProductsSpy.mockReturnValue( Promise.reject() );
        wrapper = getRender();

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

        expect( mockedUsedNavigate ).toHaveBeenCalledWith( SearchService.states.error );

    });

    test( 'Should show loading', async ()=> {
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

        setTimeout( ()=> {
            getProductsSpy.mockReturnValue( Promise.resolve( defaultSearchResults ) );
        }, 3000 );

        const loader = wrapper.container.querySelector( '.sid-loading__page' );
        expect( loader ).toBeInTheDocument();

    });

});
