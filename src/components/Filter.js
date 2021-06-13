import React from 'react';

export default function Filter(props) {

    //console.log(size);
    //return '';

    return (
        <div className="filters">
            <div className="filter-count">
                Element count: { props.products.length }
            </div>
            <div className="filter-sort">
                Order: 
                <select name="sort" value={props.sort} onChange={props.productsSort}>
                    <option value="">seleziona</option>
                    <option value="asc">asc</option>
                    <option value="desc">desc</option>
                </select>
            </div>
            <div className="filter-size">
                Size: 
                <select name="size" value={props.size} onChange={props.productsSize}>
                    <option value="X">X</option>
                    <option value="XL">XL</option>
                    <option value="XXL">XXL</option>
                </select>
            </div>
        </div>
    );
}