import React  from 'react';
import { render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import HomePage from './HomePage';
import { BrowserRouter } from 'react-router-dom';

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

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-home-page' );
        expect( element ).toBeInTheDocument();
    });

});
