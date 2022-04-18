import React  from 'react';
import { render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import Loading from './Loading';
import { BrowserRouter } from 'react-router-dom';

describe( 'Loading', () => {
    let wrapper: RenderResult;

    const getRender = (): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <Loading/>
                </SearchProvider>
            </BrowserRouter>
        );
    };

    beforeEach( async ()=>{
        act( ()=> {
            wrapper = getRender();
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const loader = wrapper.container.querySelector( '.sid-loading__page' );
        expect( loader ).toBeInTheDocument();
    });

});
