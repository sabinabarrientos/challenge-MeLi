import React  from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '../../models/Product.model';
import { ConditionOptions, CurrencyTypes } from '../../enums/enums';
import { mockedUsedNavigate } from '../../setupTests';
import SearchService from '../../services/Search.service';

describe( 'ProductCard', () => {
    let wrapper: RenderResult;

    const mockData: Product = {
        title: 'Mock',
        price: {
            currency: CurrencyTypes.arg,
            amount: 1500,
            decimals: 99
        },
        picture: '',
        id: 'ML1111',
        free_shipping: true,
        condition: ConditionOptions.nuevo,
        city: ''
    };

    const getRender = ( mockData: Product ): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <ProductCard data={mockData} />
                </SearchProvider>
            </BrowserRouter> );
    };

    afterEach( () => {
        cleanup();
    });

    beforeEach( async ()=>{
        act( ()=> {
            wrapper = getRender( mockData );
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-product-card' );

        expect( element ).toBeInTheDocument();
    });

    test( 'Should redirect to item detail page', async ()=> {
        const element = wrapper.container.querySelector( '.sid-product-card__content' );

        expect( element ).toBeInTheDocument();

        if ( element ) {
            act( () => {
                fireEvent.click( element );
                return Promise.resolve();
            });
        }

        expect( mockedUsedNavigate ).toHaveBeenCalledWith( `${SearchService.states.detail}${mockData.id}` );

    });

    test( 'Should show free shipping icon', async ()=> {
        const icon = wrapper.container.querySelector( '.sid-product-card__free-shipping-icon' );

        expect( icon ).toBeInTheDocument();

    });
});
