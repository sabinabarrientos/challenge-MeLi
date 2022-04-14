import React from 'react';
import { ButtonSizes, OperationResult } from '../../enums/enums';
import Button from '../Button/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchService from '../../services/Search.service';
import './SharedOperationResult.scss';

const SharedOperationResult: React.FC = (): JSX.Element => {
    const navigateTo = useNavigate();
    const { state } = useLocation();

    const homeRedirect = ():void => {
        navigateTo( SearchService.states.home );
    };

    const title = state === OperationResult.success ? 'Listo!' : ':(';
    const subtitle = state === OperationResult.success ? 'Tu compra fue exitosa.' :'Algo salió mal.';
    const buttonText = state === OperationResult.success ? 'Seguir comprando' : 'Volver al inicio';

    return (
        <section className='shared-operation-result__container'>

            <h1 className={`shared-operation-result__${state}__title`}>{ title }</h1>
            <h3 className={`shared-operation-result__${state}__subtitle`}>{subtitle}</h3>

            <Button size={ButtonSizes.normal} text={buttonText} handleOnClick={homeRedirect}/>
        </section>
    );
};

export default SharedOperationResult;
