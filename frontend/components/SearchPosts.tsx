import React from 'react';

import { ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
import useSearchPosts from '../hooks/useSearchPosts';

const QuickSearchSuggestions = (props: any) => {
    const { isValid, searchQuery, take, skip } = props;
    const {
        hasSuggestions,
        isLoading,
        isOpen,
        items,
        count
    } = useSearchPosts({ isValid, searchQuery, take, skip });

    const suggestions = items.map((product: any) => {
        //console.log(product.id, product.title)
        return <ListGroup.Item key={product.id}>
            {product.title}
        </ListGroup.Item>
    });

    const shouldDisplaySuggestions = suggestions ? <section>
        <ListGroup>
            {suggestions}
        </ListGroup>
    </section> : null;

    if (isOpen && hasSuggestions) {
        return shouldDisplaySuggestions;
    } else if (isLoading) {
        return <div>
            <ListGroup.Item>Loading...</ListGroup.Item>
        </div>;
    } else if (isOpen && !hasSuggestions) {
        return <div>
            <ListGroup>
                <ListGroup.Item>No products found</ListGroup.Item>
            </ListGroup>
        </div>
    } else {
        return null;
    }
};

QuickSearchSuggestions.propTypes = {
    isValid: PropTypes.bool.isRequired,
    searchQuery: PropTypes.string.isRequired
};

export default QuickSearchSuggestions;
