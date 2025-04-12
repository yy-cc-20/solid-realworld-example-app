import { Show, type Component, type JSX } from 'solid-js';
import { toggleFavoriteArticle } from '../services/articleService';
import { Article } from '../types';
import { isAuthenticated } from '../services/authService';

interface FavouriteUnfavouriteButtonProps {
    style: string | undefined;
    children: JSX.Element;
    article: Article;
    onClick: () => void;
}

const FavouriteUnfavouriteButton: Component<FavouriteUnfavouriteButtonProps> = (props) => {
    return (
        <button
            class={props.style}
            classList={{
                active: isAuthenticated() && props.article.favorited,
            }}
            onClick={() => {
                if (!isAuthenticated()) {
                    alert('Please login to continue');
                    return;
                }
                toggleFavoriteArticle(props.article.slug!);
                props.onClick();
            }}
        >
            <i class='ion-heart'></i> {props.children}
        </button>
    );
};

export default FavouriteUnfavouriteButton;
