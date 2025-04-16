// List of tags
// List of articles pulled from either Feed, Global, or by Tag
// Pagination for list of articles

// The Home page includes up to three tabs:
// a default Global Feed tab
// an optional tag name tab, appears after clicking one of the popular tags
// an optional Your Feed tab, appears after logging in

import { createResource, createSignal, For, onMount, Show, type Component } from 'solid-js';
import { A } from '@solidjs/router';
import ArticleList from '../components/ArticleListComponent';
import { getTagList } from '../../manageTag';
import type { ArticleFilter } from '../types';
import { isAuthenticated } from '../../manageAccess';

const Home: Component = () => {
    const initialFilter: ArticleFilter = {
        feed: false,
        tag: '',
        favorited: false,
        author: '',
    };

    const [activeTab, setActiveTab] = createSignal('Global Feed');
    const [articleFilter, setArticleFilter] = createSignal<ArticleFilter>(initialFilter);
    const [tags] = createResource(getTagList);

    onMount(() => {
        if (isAuthenticated()) {
            setActiveTab('Your Feed');
        }
    });

    return (
        <div class='home-page'>
            <div class='banner'>
                <div class='container'>
                    <h1 class='logo-font'>conduit</h1>
                    <p>A place to share your knowledge.</p>
                </div>
            </div>

            <div class='container page'>
                <div class='row'>
                    <div class='col-md-9'>
                        <div class='feed-toggle'>
                            <ul class='nav nav-pills outline-active'>
                                <Show when={isAuthenticated()}>
                                    <li class='nav-item'>
                                        <A
                                            class='nav-link'
                                            href=''
                                            classList={{
                                                active: activeTab() === 'Your Feed',
                                            }}
                                            onclick={() => {
                                                setActiveTab('Your Feed');
                                                setArticleFilter({
                                                    feed: true,
                                                    tag: '',
                                                    favorited: false,
                                                    author: '',
                                                });
                                            }}
                                        >
                                            Your Feed
                                        </A>
                                    </li>
                                </Show>
                                <li class='nav-item'>
                                    <A
                                        class='nav-link'
                                        href=''
                                        classList={{
                                            active: activeTab() === 'Global Feed',
                                        }}
                                        onClick={() => {
                                            setActiveTab('Global Feed');
                                            setArticleFilter({
                                                feed: false,
                                                tag: '',
                                                favorited: false,
                                                author: '',
                                            });
                                        }}
                                    >
                                        Global Feed
                                    </A>
                                </li>
                                <Show when={articleFilter().tag != ''}>
                                    <li class='nav-item'>
                                        <A
                                            class='nav-link'
                                            href=''
                                            classList={{
                                                active: activeTab() === articleFilter().tag,
                                            }}
                                        >
                                            {articleFilter().tag}
                                        </A>
                                    </li>
                                </Show>
                            </ul>
                        </div>
                        <ArticleList articleFilter={articleFilter()} />
                    </div>

                    <div class='col-md-3'>
                        <div class='sidebar'>
                            <p>Popular Tags</p>
                            <For each={tags()} fallback={<p>No tags found</p>}>
                                {(tag) => (
                                    <a
                                        href=''
                                        class='tag-pill tag-default'
                                        onClick={() => {
                                            setActiveTab(tag);
                                            setArticleFilter({
                                                feed: false,
                                                tag: tag,
                                                favorited: false,
                                                author: '',
                                            });
                                        }}
                                    >
                                        {tag}
                                    </a>
                                )}
                            </For>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
