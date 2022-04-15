import React from 'react';
import './Breadcrumb.scss';

export interface BreadcrumbProps {
    categories: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }): JSX.Element => {

    return (
        <>
            {!!categories && !!categories.length &&
                <section className='breadcrumb__list'>
                    {categories.map( ( elem, index ) =>
                        <span
                            key={index}
                            className='breadcrumb__list__categories'
                        >
                            {index !== categories.length - 1 ?
                                elem + ' >' : elem}
                        </span>
                    )}
                </section>}
        </>
    );
};

export default Breadcrumb;
