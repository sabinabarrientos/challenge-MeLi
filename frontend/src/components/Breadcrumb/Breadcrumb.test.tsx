import React  from 'react';
import { render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import Breadcrumb from './Breadcrumb';
import { BrowserRouter } from 'react-router-dom';

describe( 'Breadcrumb', () => {
    let wrapper: RenderResult;

    let mockCategories: string[] = [];

    const getRender = ( mockCategories: string[] ): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <Breadcrumb categories={ mockCategories }/>
                </SearchProvider>
            </BrowserRouter> );
    };

    beforeEach( async ()=>{
        await act( ()=> {
            wrapper = getRender( mockCategories );
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-breadcrumb' );
        expect( element ).toBeInTheDocument();
    });

    test( 'Should not show categories list', ()=> {
        const element = wrapper.container.querySelector( '.sid-breadcrumb__list' );
        expect( element ).not.toBeInTheDocument();
    });

    test( 'Should show categories list', ()=> {
        mockCategories= [ 'categoria1', 'categoria2' ];
        wrapper= getRender( mockCategories );
        const element = wrapper.container.querySelector( '.sid-breadcrumb__list' );
        expect( element ).toBeInTheDocument();
    });

});
