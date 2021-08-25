import React from 'react';
import './pagination.scss';
import {Button} from "@material-ui/core";

const Pagination = (props: any) => {
    const pageNumbers = [];
    const countPages = Math.ceil(props.totalPhotos / props.photosPerPage)


    for (let i = 1; i <= countPages; i++) {
        pageNumbers.push(i)
    }

    if (!props.loadMore) {
        return (
            <div className="container__btns">
                <Button variant="outlined" color="primary" className="btn-more" onClick={() => props.changeLoad(true)}>
                    Load more
                </Button>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="container__body">
            <ul className="container__pagination">
                {
                    pageNumbers.map(number => (
                        <li className="container__pagination-item" key={number}>
                            <button onClick={() => props.getPageNumber(number)}>
                                {number}
                            </button>
                        </li>
                    ))
                }
            </ul>
            </div>
        </div>
    )
}
export default Pagination;
