import React  from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { defaultSearchResults, SearchProvider } from '../../providers/Search.provider';
import reactRouterDom from 'react-router-dom';
import { BrowserRouter, useHistory } from 'react-router-dom';
import Layout from './Layout';
import SearchService from '../../services/Search.service';
import { ItemsResult } from '../../models/Result.model';
import {createMemoryHistory} from 'history';

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

    // test( 'Should redirect to error page on service error', ()=> {
    //     const element = wrapper.container.querySelector( '.sid-layout' );
    //     expect( element ).toBeInTheDocument();
    //     expect( getProductsSpy ).toHaveBeenCalled();
    //     getProductsSpy.mockReturnValue( Promise.reject() );
    // });

});
