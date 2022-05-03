import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import {Section} from '../../styles/styles'

const Search = ({children}: any) => {
    const [ searchQuery, setSearchQuery ] = useState('');
    const handleChange = (value: any) => {
        const valueEntered = !!value;
        setSearchQuery(value);
    }

    const ClonedChildren = React.cloneElement(children, {searchQuery});

    return (
        <>
        <div className="justify-content-center d-flex position-relative">
            <Form className="w-100">
                <FormControl type="text" placeholder="Search entire shop" 
                  className="w-100" onChange={e => handleChange(e.target.value)}/>
            </Form>
        </div>
            <Section>
                {ClonedChildren}
            </Section>

        </>
    );
};


export default Search;