import { For, Show, type Component } from 'solid-js';
import { formatDate, nameToSlug } from '../../../shared';
import type { CommentList } from '../types';
import { user, isAuthenticated } from '../../manageAccess';
import { deleteComment } from '../service';

interface CommentListProps {
    slug: string;
    onDelete: () => void;
    comments: CommentList;
}

const CommentListFromAnArticle: Component<CommentListProps> = (props) => {
    function handleDeleteComment(slug: string, id: number) {
        if (confirm('Are you sure you want to delete this comment?')) {
            deleteComment(slug, id)
                .then(() => {
                    props.onDelete();
                })
                .catch((error) => {
                    alert('Error deleting comment, please try again');
                });
        }
    }

    return (
        <For each={props.comments.comments} fallback={<div>Loading...</div>}>
            {(comment) => (
                <div class='card'>
                    <div class='card-block'>
                        <p class='card-text'>{comment.body}</p>
                    </div>
                    <div class='card-footer'>
                        <a href={`/profile/${nameToSlug(comment.author.username)}`} class='comment-author'>
                            <img src={comment.author.image} class='comment-author-img' />
                        </a>
                        &nbsp;
                        <a href={`/profile/${nameToSlug(comment.author.username)}`} class='comment-author'>
                            {comment.author.username}
                        </a>
                        <span class='date-posted'>{formatDate(comment.createdAt)}</span>
                        <Show when={isAuthenticated() && comment.author.username === user.username}>
                            <button class='btn btn-sm btn-outline-danger' onClick={() => handleDeleteComment(props.slug, comment.id)}>
                                <i class='ion-trash-a'></i>
                            </button>
                        </Show>
                    </div>
                </div>
            )}
        </For>
    );
};

export default CommentListFromAnArticle;
