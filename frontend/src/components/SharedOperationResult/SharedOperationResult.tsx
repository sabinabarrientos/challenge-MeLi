import React from 'react';
import { ButtonSizes, OperationResult } from '../../enums/enums';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import SearchService from '../../services/Search.service';
import './SharedOperationResult.scss';

export interface SharedOperationResultProps {
    location: {
        state: {
            isError: boolean;
        }
    }
}

const SharedOperationResult: React.FC<SharedOperationResultProps> = ({ location }): JSX.Element => {
    const navigateTo = useNavigate();
    const { isError } = location.state;

    const homeRedirect = ():void => {
        navigateTo( SearchService.states.home );
    };

    const title = !isError ? 'Listo!' : ':(';
    const subtitle = !isError ? 'Tu compra fue exitosa.' :'Algo salió mal.';
    const buttonText = !isError ? 'Seguir comprando' : 'Volver al inicio';

    const state = isError ? OperationResult.error : OperationResult.success;

    return (
        <section className='sid-shared-operation-result__container shared-operation-result__container'>

            <h1 className={`sid-shared-operation-result__${state}__title
            shared-operation-result__${state}__title`}>{ title }</h1>
            <h3 className={`sid-shared-operation-result__${state}__subtitle
            shared-operation-result__${state}__subtitle`}>{subtitle}</h3>

            <Button size={ButtonSizes.normal} text={buttonText} handleOnClick={homeRedirect}/>
        </section>
    );
};

export default SharedOperationResult;
