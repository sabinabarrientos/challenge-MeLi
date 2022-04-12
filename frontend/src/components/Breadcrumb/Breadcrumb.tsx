import React from 'react';
import './Breadcrumb.scss';

export interface BreadcrumbProps {
    categories: string[] | undefined;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }): JSX.Element => {

    return (
        <>
            {!!categories && !!categories.length &&
                <section className='breadcrumb__list'>
                    {categories.map( ( elem, index ) =>
                        index === categories.length - 1 ?
                            <a
                                key={index}
                                className='breadcrumb__list__last-cat'
                                href=''>
                                {elem}
                            </a>
                            : <a
                                key={index}
                                className='breadcrumb__list__categories'
                                href=''>
                                {` ${elem} >`}
                            </a>
                    )}
                </section>}
        </>
    );
};

export default Breadcrumb;
