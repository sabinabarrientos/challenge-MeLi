import React  from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import {  SearchProvider } from '../../providers/Search.provider';
import SharedOperationResult from './SharedOperationResult';
import { BrowserRouter } from 'react-router-dom';
import { mockedUsedNavigate } from '../../setupTests';
import SearchService from '../../services/Search.service';

describe( 'SharedOperationResult', () => {
    let wrapper: RenderResult;

    const getRender = (): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <SharedOperationResult/>
                </SearchProvider>
            </BrowserRouter>
        );
    };

    beforeEach( async ()=>{
        await act( ()=> {
            wrapper = getRender();
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-shared-operation-result__container' );
        expect( element ).toBeInTheDocument();
    });

    test( 'Should redirect to home page', async ()=> {
        const button = wrapper.container.querySelector( '.sid-button__normal' );
        expect( button ).toBeInTheDocument();

        if ( button ) {
            await act( () => {
                fireEvent.click( button );
                return Promise.resolve();
            });
        }

        expect( mockedUsedNavigate ).toHaveBeenCalledWith( SearchService.states.home );
    });

    test( 'Should render error page', async ()=> {
        const button = wrapper.container.querySelector( '.sid-button__normal' );
        const titulo = wrapper.container.querySelector( '.sid-shared-operation-result__error__title' );
        const subtitulo = wrapper.container.querySelector( '.sid-shared-operation-result__error__subtitle' );

        expect( button ).toBeInTheDocument();
        expect( titulo ).toBeInTheDocument();
        expect( subtitulo ).toBeInTheDocument();

        // ...
        // ...
    });

});
