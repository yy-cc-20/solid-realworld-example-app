// Delete article button (only shown to article’s author)
// Render markdown from server client side
// Comments section at bottom of page
// Delete comment button (only shown to comment’s author)

// TODO : update to switch between follow/favorite AND edit/delete

import { useParams } from '@solidjs/router';
import { createResource, type Component } from 'solid-js';
import { getArticleDetail } from '../services/articleService';
import { getCommentsFromAnArticle } from '../services/commentService';
import type { Article, CommentList as CommentListType } from '../interfaces';
import { ArticleContent, ArticleActionButtons, CommentList, CreateCommentForm } from '../components';

const Article: Component = () => {
    const params = useParams();
    console.log('params', params);
    const [article, { refetch: refetchArticle }] = createResource<Article>(() => getArticleDetail(params.slug));
    const [comments, { refetch: refetchComments }] = createResource<CommentListType>(() => getCommentsFromAnArticle(params.slug));

    return (
        <>
            <div class='article-page'>
                <div class='banner'>
                    <div class='container'>
                        <h1>{article()?.title}</h1>

                        {article.loading ? <div>Loading...</div> : <ArticleActionButtons article={article()!} onClick={refetchArticle} />}
                    </div>
                </div>

                <div class='container page'>
                    {article.loading ? <div>Loading...</div> : <ArticleContent article={article()!} />}

                    <hr />

                    <div class='article-actions'>
                        {article.loading ? <div>Loading...</div> : <ArticleActionButtons article={article()!} onClick={refetchArticle} />}
                    </div>

                    <div class='row'>
                        <div class='col-xs-12 col-md-8 offset-md-2'>
                            <CreateCommentForm onCreate={refetchComments} slug={params.slug} />
                            {comments.loading ? <div>Loading...</div> : <CommentList onDelete={refetchComments} slug={params.slug} comments={comments()!} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Article;
