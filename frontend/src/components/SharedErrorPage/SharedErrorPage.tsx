import React from 'react';
import { ButtonSizes } from '../../enums/enums';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import SearchService from '../../services/Search.service';
import './SharedErrorPage.scss';

const SharedErrorPage: React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    const homeRedirect = ():void => {
        navigateTo( SearchService.states.home );
    };

    return (
        <section className='shared-error-page__container'>
            <h1 className='shared-error-page__error-icon'>:(</h1>
            <h3 className='shared-error-page__title'>Algo salió mal</h3>
            <Button size={ButtonSizes.normal} text='Volver al inicio' handleOnClick={homeRedirect}/>
        </section>
    );
};

export default SharedErrorPage;
