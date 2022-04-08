import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../providers/Search.provider';
import SearchService from '../../services/Search.service';
import SearchBar from '../SearchBar/SearchBar';
import './ItemDetail.scss';


const ItemDetail: React.FC = (): JSX.Element => {

    const context = useContext(SearchContext);
    const history = useNavigate();
    const [query, setQuery] = useState('');


    const clickRedirect = (): void => {
        SearchService.getProducts('')
            .then((data) => {
                context.updateResult(data);
            })
            .catch((error) => { console.log(error) })
        history(SearchService.states.home)
    }

    const updateQuery = (query: string): void => {
        setQuery(query);
        SearchService.getProducts(query)
            .then((data) => {
                context.updateResult(data);
            })
            .catch((error) => { console.log(error) })
        history(`${SearchService.states.search}?search=${query}`)
    }

    return (
        <section className='item-detail__content'>
            <SearchBar onInputChange={updateQuery} onClickHandler={clickRedirect} />

        </section >
    )
}

export default ItemDetail;