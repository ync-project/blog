import { SearchProps, Suggestion } from '../../types/app_types'  
import usePostsSuggestions from './usePostsSuggestions';
import ListItem from './ListItem'
import { Post } from '../../types/graphql_generated'
import Search from './Search'
import {Button, Suggestions} from '../../styles/styles'

const PostSearch = () => {
    return (
        <Search>
            <PostSearchSuggestions searchQuery={''}/>
        </Search>
    )            
};

const PostSearchSuggestions = ({searchQuery}: SearchProps) => {
    const {
        hasSuggestions,
        isLoading,
        hasMore,
        totalCount,
        items,
        loadingMore,
        loadMore
    }: Suggestion<Post> = usePostsSuggestions(searchQuery);

    const suggestions = items.map((product: any) => {
        return <li key={product.id}>
            {product.title}
        </li>
    });

    const shouldDisplaySuggestions = suggestions ? 
    <Suggestions>
            <ListItem posts={items} totalCount={totalCount} />
        {hasMore && (
            <Button onClick={() => loadMore()} disabled={loadingMore}>
              {loadingMore ? 'Loading...' : 'Show More'} 
            </Button>
          )}
    </Suggestions> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions ;
    } else if (isLoading) {
        return <Suggestions>
            <p>Loading...</p>
        </Suggestions>;
    } else if (!hasSuggestions) {
        return <Suggestions>
                <p>No products found</p>
        </Suggestions>
    } else {
        return null;
    }
};

export default PostSearch;