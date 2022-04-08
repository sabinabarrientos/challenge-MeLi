import React from 'react'
import './Breadcrumb.scss';

export interface BreadcrumbProps {
    categories: string[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ categories }): JSX.Element => {
    return (
        <section className='breadcrumb__list'>
            {categories.map((elem, index) =>
                index === categories.length - 1 ?
                    <a className='breadcrumb__list__last-cat' href=''> {elem}</a>
                    : <a className='breadcrumb__list__categories' href=''> {` ${elem} >`}</a>
            )}
        </section>
    )
}

export default Breadcrumb;