import { createEffect, createMemo, createResource, createSignal, For, type Component } from 'solid-js';
import { formatDate, nameToSlug } from '../../../shared';
import { type ArticleFilter } from '../types';
import type { Pagination } from '../../../shared';
import { getArticleList } from '../service';
import { FavouriteUnfavouriteButton } from '../../favouriteArticle';
import ArticleTagList from './ArticleTagList';

const ArticleListComponent: Component<{
    articleFilter: ArticleFilter;
}> = (props) => {
    const initialPagination: Pagination = {
        limit: 2,
        offset: 0,
    };
    const firstPage = 1;
    const [currentPage, setCurrentPage] = createSignal(firstPage);
    const [pagination, setPagination] = createSignal<Pagination>(initialPagination);
    const [articles, { refetch: refetchArticles }] = createResource(
        props.articleFilter, // when the props change, this will be called again
        async () => (await getArticleList(props.articleFilter, pagination())) || { articles: [], articlesCount: 0 },
    );
    const totalPages = createMemo(() => Math.ceil((articles()?.articlesCount ?? 0) / (pagination().limit ?? 1)));
    const goToPage = (page: number) => {
        setPagination((prev) => ({
            ...prev,
            offset: (page - 1) * prev.limit,
        }));
        refetchArticles();
        setCurrentPage(page);
    };

    createEffect(() => {
        if (props.articleFilter) {
            console.log('Article filter changed:', props.articleFilter);
            refetchArticles();
        }
    }, [props.articleFilter]);

    return (
        <>
            <For each={articles()?.articles || []} fallback={<div>Loading...</div>}>
                {(article) => (
                    <div class='article-preview'>
                        <div class='article-meta'>
                            <a href={`/profile/${nameToSlug(article.author.username)}`}>
                                <img src={article.author.image} />
                            </a>
                            <div class='info'>
                                <a href={`/profile/${nameToSlug(article.author.username)}`} class='author'>
                                    {article.author.username}
                                </a>
                                <span class='date'>{formatDate(article.createdAt)}</span>
                            </div>
                            <FavouriteUnfavouriteButton
                                style='btn btn-outline-primary btn-sm pull-xs-right'
                                article={article}
                                onClick={refetchArticles}
                            >
                                {article.favoritesCount}
                            </FavouriteUnfavouriteButton>
                        </div>
                        <a href={`/article/${article.slug}`} class='preview-link'>
                            <h1>{article.title}</h1>
                            <p>{article.description}</p>
                            <span>Read more...</span>
                            <ArticleTagList tagList={article.tagList} />
                        </a>
                    </div>
                )}
            </For>

            <ul class='pagination'>
                <For
                    each={Array.from(
                        {
                            length: totalPages(),
                        },
                        (_, i) => i + 1,
                    )}
                >
                    {(page) => (
                        <li
                            class='page-item'
                            classList={{
                                active: currentPage() === page,
                            }}
                        >
                            <a class='page-link' href='#' onClick={() => goToPage(page)}>
                                {page}
                            </a>
                        </li>
                    )}
                </For>
            </ul>
        </>
    );
};

export default ArticleListComponent;
