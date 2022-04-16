import React  from 'react';
import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider, defaultSearchResults } from '../../providers/Search.provider';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from './ProductCard';
import { ItemsResult } from '../../models/Result.model';
import { Product } from '../../models/Product.model';
import { ConditionOptions, CurrencyTypes } from '../../enums/enums';
import { wait } from '@testing-library/user-event/dist/utils';
import SearchService from '../../services/Search.service';

describe( 'ProductCard', () => {
    let wrapper: RenderResult;
    const mockedNavigator = jest.fn();
    jest.mock( 'react-router-dom', () => ({
        ...( jest.requireActual( 'react-router-dom' ) as any ),
        useNavigate: () => ({
            navigate: jest.fn().mockImplementation( () => ({}) )
        })
    }) );

    const mockData: Product = {
        title: 'Mock',
        price: {
            currency: CurrencyTypes.arg,
            amount: 1500,
            decimals: 99
        },
        picture: '',
        id: 'ML1111',
        free_shipping: false,
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
        window.alert = jest.fn();
        await act( ()=> {
            wrapper = getRender( mockData );
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-product-card' );

        expect( element ).toBeInTheDocument();
    });

    // test( 'Should redirect to item detail page', async ()=> {
    //     const element = wrapper.container.querySelector( '.sid-product-card' );

    //     expect( element ).toBeInTheDocument();

    //     if ( element ) {
    //         await act( () => {
    //             fireEvent.click( element );
    //             return Promise.resolve();
    //         });
    //     }

    //     await wait( () => {
    //         expect( mockedNavigator ).toHaveBeenCalledWith( SearchService.states.detail );
    //     });

    // });
});
