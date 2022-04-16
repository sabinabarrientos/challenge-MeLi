import React  from 'react';
import { cleanup, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider, defaultItemDetailResult } from '../../providers/Search.provider';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import SearchService from '../../services/Search.service';
import { ItemDetailResult } from '../../models/Result.model';
import { wait } from '@testing-library/user-event/dist/utils';

describe( 'ItemDetail', () => {
    let wrapper: RenderResult,
        getItemDetailSpy: jest.SpyInstance<Promise<ItemDetailResult>>;

    const mockedNavigator = jest.fn();
    jest.mock( 'react-router-dom', () => ({
        ...( jest.requireActual( 'react-router-dom' ) as any ),
        useNavigate: () => ({
            navigate: jest.fn().mockImplementation( () => ({}) )
        })
    }) );

    const getRender = (): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <ItemDetail/>
                </SearchProvider>
            </BrowserRouter> );
    };

    afterEach( () => {
        cleanup();
        getItemDetailSpy.mockClear();
    });

    beforeAll( () => {
        getItemDetailSpy = jest.spyOn( SearchService, 'getItemDetail' );
    });

    beforeEach( async ()=>{
        getItemDetailSpy.mockReturnValue( Promise.resolve( defaultItemDetailResult ) );

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

    // test( 'Should redirect to error page on service error', async () => {
    //     await act( () => {
    //         getItemDetailSpy.mockReturnValue( Promise.reject() );
    //         wrapper = getRender();
    //         return Promise.resolve();
    //     });

    //     await wait( () => {
    //         expect( mockedNavigator ).toHaveBeenCalled();
    //     });
    // });

});
