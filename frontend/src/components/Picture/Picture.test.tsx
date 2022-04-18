import React  from 'react';
import { render, RenderResult } from '@testing-library/react';
import { act } from 'react-test-renderer';
import { SearchProvider } from '../../providers/Search.provider';
import Picture, { PictureProps } from './Picture';
import { BrowserRouter } from 'react-router-dom';
import { PictureSizes } from '../../enums/enums';

describe( 'Picture', () => {
    let wrapper: RenderResult;

    const props: PictureProps = {
        size: PictureSizes.small,
        src: '',
        alt: ''
    };

    const getRender = ( props: PictureProps ): RenderResult => {
        return render(
            <BrowserRouter>
                <SearchProvider>
                    <Picture {...props}/>
                </SearchProvider>
            </BrowserRouter>
        );
    };

    beforeEach( async ()=>{
        act( ()=> {
            wrapper = getRender( props );
            return Promise.resolve();
        });
    });

    test( 'Should render without error', ()=> {
        const element = wrapper.container.querySelector( '.sid-picture__container-small' );
        expect( element ).toBeInTheDocument();
    });

});
