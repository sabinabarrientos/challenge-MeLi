import React  from 'react';
import { render, RenderResult } from '@testing-library/react';
import { create, act } from 'react-test-renderer';
import renderer from 'react-test-renderer';

import { ItemsContextProps, SearchContext, SearchProvider } from '../../providers/Search.provider';
import HomePage from './HomePage';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

describe( 'HomePage', () => {
    let wrapper: RenderResult;

    const getRender = (): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <HomePage/>
                </SearchProvider>
            </BrowserRouter> );
    };

    beforeEach( async ()=>{
        await act( ()=> {
            wrapper = getRender();
            return Promise.resolve();
        });
    });

    test( 'saranga', ()=> {
        const component = wrapper.container.querySelector( '.home-page' );
        expect( component ).toBeInTheDocument();
    });

});
