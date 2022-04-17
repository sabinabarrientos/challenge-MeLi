import React  from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import ProductInfo, { ProductInfoProps } from './ProductInfo';
import { BrowserRouter } from 'react-router-dom';
import { ConditionOptions, CurrencyTypes, OperationResult } from '../../enums/enums';
import { mockedUsedNavigate } from '../../setupTests';
import SearchService from '../../services/Search.service';

describe( 'ProductInfo', () => {
    let wrapper: RenderResult;

    let mockProductInfoProps: ProductInfoProps = {
        condition: ConditionOptions.nuevo,
        sold: 10,
        title: 'Producto mock 1',
        price: {
            currency: CurrencyTypes.arg,
            amount: 3000,
            decimals: 50
        }
    };

    const getRender = ( mockProductInfoProps: ProductInfoProps ): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <ProductInfo {...mockProductInfoProps}/>
                </SearchProvider>
            </BrowserRouter>
        );
    };

    beforeEach( async ()=>{
        await act( ()=> {
            wrapper = getRender( mockProductInfoProps );
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-product-info__content' );
        expect( element ).toBeInTheDocument();
    });

    test( 'Should show information', async ()=> {
        const condition = wrapper.container.querySelector( '.sid-product-info__condition' );
        const title = wrapper.container.querySelector( '.sid-product-info__title' );
        const amount = wrapper.container.querySelector( '.sid-product-info__amount' );
        const button = wrapper.container.querySelector( '.sid-button__fullwidth' );

        expect( condition ).toBeInTheDocument();
        expect( title ).toBeInTheDocument();
        expect( amount ).toBeInTheDocument();
        expect( button ).toBeInTheDocument();

    });

    test( 'Should show \'new\' condition', async ()=> {
        const condition = wrapper.container.querySelector( '.sid-product-info__condition' );

        expect( condition ).toBeInTheDocument();
        expect( condition ).toHaveTextContent( 'Nuevo - 10 vendidos' );

    });

    test( 'Should show \'usado\' condition', async ()=> {
        mockProductInfoProps = {
            condition: ConditionOptions.usado,
            sold: 10,
            title: 'Producto mock 1',
            price: {
                currency: CurrencyTypes.arg,
                amount: 3000,
                decimals: 50
            }
        };
        wrapper = getRender( mockProductInfoProps );
        const condition = wrapper.container.querySelector( '.sid-product-info__condition' );

        expect( condition ).toBeInTheDocument();
        expect( condition ).toHaveTextContent( 'Usado - 10 vendidos' );

    });

    test( 'Should show success page on button clicked', async ()=> {
        const button = wrapper.container.querySelector( '.sid-button__fullwidth' );

        expect( button ).toBeInTheDocument();

        if ( button ) {
            await act( () => {
                fireEvent.click( button );
                return Promise.resolve();
            });
        }

        expect( mockedUsedNavigate ).toHaveBeenCalledWith(
            SearchService.states.success, { 'state': OperationResult.success });

    });

});
