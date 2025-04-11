import type { Component } from 'solid-js';
import ArticleTagList from './ArticleTagList';
import type { Article } from '../interfaces';

interface ArticleProps {
    article: Article;
}

export const ArticleContent: Component<ArticleProps> = (props) => {
    return (
        <div class='row article-content'>
            <div class='col-md-12'>
                <p>{props.article.description}</p>
                <h2 id='introducing-ionic'>{props.article.title}</h2>
                <p>{props.article.body}</p>
                <ArticleTagList tagList={props.article.tagList} />
            </div>
        </div>
    );
};

export default ArticleContent;
