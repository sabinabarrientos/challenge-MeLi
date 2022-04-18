import React  from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import { BrowserRouter } from 'react-router-dom';
import Button from './Button';
import { ButtonProps } from './Button';
import { ButtonSizes } from '../../enums/enums';

describe( 'Button', () => {
    let wrapper: RenderResult;

    let mockButtonProps: ButtonProps = {
        handleOnClick: (): void => alert( 'onClick' ),
        text:'texto del botón',
        size:ButtonSizes.fullwidth
    };

    const getRender = ( mockButtonProps: ButtonProps ): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <Button handleOnClick={mockButtonProps.handleOnClick}
                        text={mockButtonProps.text}
                        size={mockButtonProps.size}/>
                </SearchProvider>
            </BrowserRouter> );
    };

    afterEach( () => {
        cleanup();
    });

    beforeEach( async ()=>{
        window.alert = jest.fn();
        act( ()=> {
            wrapper = getRender( mockButtonProps );
            return Promise.resolve();
        });
    });

    test( 'Should render fullwidth size button without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-button__fullwidth' );

        expect( element ).toBeInTheDocument();
    });

    test( 'Should show text button ', ()=> {
        const element = wrapper.container.querySelector( '.sid-button__text' );
        expect( element ).toHaveTextContent( mockButtonProps.text );
    });

    test( 'Should show window alert on button clicked ', async ()=> {
        const element = wrapper.container.querySelector( '.sid-button__fullwidth' );
        expect( element ).toBeInTheDocument();

        if ( element ) {
            act( () => {
                fireEvent.click( element );
                return Promise.resolve();
            });
        }

        expect( window.alert ).toHaveBeenCalled();
    });

    test( 'Should render normal size button without error', async ()=> {
        mockButtonProps = {
            handleOnClick: (): void => alert( 'onClick' ),
            text:'texto del botón',
            size:ButtonSizes.normal
        };
        act( ()=> {
            wrapper = getRender( mockButtonProps );
            return Promise.resolve();
        });
        const element = wrapper.container.querySelector( '.sid-button__normal' );

        expect( element ).toBeInTheDocument();
    });

});
