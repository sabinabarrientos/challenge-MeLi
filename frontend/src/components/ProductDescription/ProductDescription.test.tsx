import React  from 'react';
import { render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import ProductDescription, { ProductDescriptionProps } from './ProductDescription';
import { BrowserRouter } from 'react-router-dom';

describe( 'ProductDescription', () => {
    let wrapper: RenderResult;

    const props: ProductDescriptionProps = {
        title: 'a title',
        description: 'a description'
    };

    const getRender = ( props: ProductDescriptionProps ): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <ProductDescription {...props}/>
                </SearchProvider>
            </BrowserRouter>
        );
    };

    beforeEach( async ()=>{
        await act( ()=> {
            wrapper = getRender( props );
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-product-description' );
        const titulo = wrapper.container.querySelector( '.sid-product-description__title' );
        const description = wrapper.container.querySelector( '.sid-product-description__description' );

        expect( element ).toBeInTheDocument();
        expect( titulo ).toBeInTheDocument();
        expect( description ).toBeInTheDocument();
    });

});
