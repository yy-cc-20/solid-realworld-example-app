import { Show, type Component } from 'solid-js';
import { formatDate, nameToSlug } from '../utils';
import FavouriteUnfavouriteButton from './FavouriteUnfavouriteButton';
import { isAuthenticated } from '../services/authService';
import { user } from '../globalStates/currentUser';
import FollowUnfollowButton from './FollowUnfollowButton';
import { useNavigate } from '@solidjs/router';
import { deleteArticle } from '../services/articleService';
import { Article } from '../types';

interface ArticleActionButtonsProps {
    article: Article;
    onClick: () => void;
}

export const ArticleActionButtons: Component<ArticleActionButtonsProps> = (props) => {
    const navigate = useNavigate();

    function handleDeleteArticle(slug: string) {
        if (confirm('Are you sure you want to delete this article?')) {
            deleteArticle(slug);
            navigate('/');
        }
    }

    return (
        <div class='article-meta'>
            <a href={`/profile/${nameToSlug(props.article.author.username)}`}>
                <img src={props.article.author.image} />
            </a>
            <div class='info'>
                <a href={`/profile/${nameToSlug(props.article.author.username)}`} class='author'>
                    {props.article.author.username}
                </a>
                <span class='date'>{formatDate(props.article.createdAt)}</span>
            </div>
            <FollowUnfollowButton profile={props.article.author} onClick={props.onClick} style='btn btn-sm btn-outline-secondary'>
                <span class='counter'>({props.article.favoritesCount})</span>
            </FollowUnfollowButton>
            &nbsp;&nbsp;
            <FavouriteUnfavouriteButton style='btn btn-sm btn-outline-primary' article={props.article} onClick={props.onClick}>
                &nbsp; {isAuthenticated() && props.article.favorited ? 'Favourited' : 'Favorite Post'}
                <span class='counter'>({props.article.favoritesCount})</span>
            </FavouriteUnfavouriteButton>
            <Show when={isAuthenticated() && props.article.author.username === user.username}>
                <button class='btn btn-sm btn-outline-secondary' onClick={() => navigate('/editor/' + props.article.slug)}>
                    <i class='ion-edit'></i> Edit Article
                </button>
                <button class='btn btn-sm btn-outline-danger' onClick={() => handleDeleteArticle(props.article.slug)}>
                    <i class='ion-trash-a'></i> Delete Article
                </button>
            </Show>
        </div>
    );
};

export default ArticleActionButtons;
