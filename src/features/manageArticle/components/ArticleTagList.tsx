import { For, type Component } from 'solid-js';
import { Tags } from '../../manageTag';

interface ArticleTagListProps {
    tagList: Tags;
}

const ArticleTagList: Component<ArticleTagListProps> = (props) => {
    return (
        <ul class='tag-list'>
            <For each={props.tagList} fallback={<p>No tags found</p>}>
                {(tag) => <li class='tag-default tag-pill tag-outline'>{tag}</li>}
            </For>
        </ul>
    );
};

export default ArticleTagList;
