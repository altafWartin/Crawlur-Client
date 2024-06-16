import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Search = ({ searchTerm, handleInputChange, handleSubmit }) => {
    console.log(searchTerm);
    return (
        <div className="d-flex justify-content-center mb-2 pb-2">
            <form onSubmit={handleSubmit} className="form-inline d-flex">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder="Search for a product"
                    className="form-control mr-sm-2"
                />
                <button type="submit" className="btn btn-primary my-2 my-sm-0">Search</button>
            </form>
        </div>
    );
};

export default Search;
