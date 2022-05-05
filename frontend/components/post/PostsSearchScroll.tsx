import { SearchProps, Suggestion } from '../../types/app_types'  
import usePostsSuggestions from './usePostsSuggestions';
import ListItem from './ListItem'
import { Post } from '../../types/graphql_generated'
import Search from './Search'

const PostSearch = () => {
  return (
    <Search>
        <PostSearchSuggestionsScroll searchQuery={''}/>
    </Search>
)            
};

const PostSearchSuggestionsScroll = ({searchQuery}: SearchProps) => {
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

    const handleScroll = ({ currentTarget }: any, onLoadMore: ()=> void, hasMore: boolean) => {
        if (
          hasMore && 
          currentTarget.scrollTop + currentTarget.clientHeight >=
          currentTarget.scrollHeight 
        ) {
          onLoadMore();
          //console.log('scrolling')
        }
      };

    const shouldDisplaySuggestions = suggestions ? 
        <div>
          <div
            onScroll={(e:any) => handleScroll(e, loadMore, hasMore)}
          >
            <div>
                <ListItem posts={items} totalCount={totalCount} />
            </div>
          </div>  
        </div> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions;
    } else if (isLoading) {
        return <div>
            <p>Loading...</p>
        </div>;
    } else if (!hasSuggestions) {
        return <div>
                <p>No products found</p>
        </div>
    } else {
        return null;
    }
};

export default PostSearch;