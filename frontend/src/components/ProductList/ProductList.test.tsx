import React  from 'react';
import { render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import ProductList from './ProductList';
import { BrowserRouter } from 'react-router-dom';
import { ItemsResult } from '../../models/Result.model';
import { ConditionOptions, CurrencyTypes } from '../../enums/enums';

describe( 'ProductList', () => {
    let wrapper: RenderResult;

    const mockData: ItemsResult = {
        author: {
            name: 'Sabina',
            lastname: 'Barrientos'
        },
        categories: [ 'categoria1' ],
        items: [
            {
                title: 'titulo',
                price: {
                    currency: CurrencyTypes.arg,
                    amount: 200,
                    decimals: 0
                },
                picture: '',
                id: 'ML93202',
                free_shipping: true,
                condition: ConditionOptions.nuevo,
                city: 'Rosario'
            }
        ]
    };

    const getRender = ( mockData: ItemsResult ): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <ProductList data={mockData}/>
                </SearchProvider>
            </BrowserRouter>
        );
    };

    beforeEach( async ()=>{
        act( ()=> {
            wrapper = getRender( mockData );
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-product-list__list' );
        expect( element ).toBeInTheDocument();
    });

    test( 'Should render a product card', ()=> {
        const element = wrapper.container.querySelector( '.sid-product-card' );
        expect( element ).toBeInTheDocument();
    });

});
