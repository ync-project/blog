import { SearchProps, Suggestion } from '../../types/app_types'  
import usePostsSuggestions from './usePostsSuggestions';
import ListItem from './ListItem'
import { Post } from '../../types/graphql_generated'
import Search from './Search'
import {Suggestions, ChapterList} from '../../styles/styles'

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
        <Suggestions>
          <ChapterList
            onScroll={(e:any) => handleScroll(e, loadMore, hasMore)}
          >
            <div>
                <ListItem posts={items} totalCount={totalCount} />
            </div>
          </ChapterList>  
        </Suggestions> : null;

    if (hasSuggestions) {
        return shouldDisplaySuggestions;
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