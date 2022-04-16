import React from 'react';
import './Breadcrumb.scss';

export interface BreadcrumbProps {
    categories: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }): JSX.Element => {

    return (
        <section className='sid-breadcrumb'>
            {!!categories && !!categories.length &&
                <section className='sid-breadcrumb__list breadcrumb__list'>
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
        </section>
    );
};

export default Breadcrumb;
