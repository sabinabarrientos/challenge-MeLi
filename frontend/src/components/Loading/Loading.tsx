import React from 'react'
import './Loading.scss';


const Loading: React.FC = (): JSX.Element => {

    return (
        <div className='loading__page'>

            <button
                aria-label='loader'
                className='loader'
            >
                <div className='spinner' />
                <p className='text'>loader</p>
            </button>
        </div>
    );
}


export default Loading;