import React, { useState } from 'react';

const Search = ({children}: any) => {
    const [ searchQuery, setSearchQuery ] = useState('');
    const handleChange = (value: any) => {
        const valueEntered = !!value;
        setSearchQuery(value);
    }

    const ClonedChildren = React.cloneElement(children, {searchQuery});

    return (
        <>
        <div className="flex flex-col mb-4">
        <label className="mb-2 uppercase font-bold text-lg text-grey-darkest" htmlFor="searchText">Search</label>         
        <input type="text" placeholder="Search entire site" id="searchText"
            onChange={e => handleChange(e.target.value)}
            className="border py-2 px-5 text-grey-darkest" 
            />
        </div>
            <div>
                {ClonedChildren}
            </div>
        </>
    );
};


export default Search;