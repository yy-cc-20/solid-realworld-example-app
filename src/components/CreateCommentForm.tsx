import { createSignal, Show, type Component } from 'solid-js';
import { user } from '../stores/userStore';
import { CreateCommentRequest } from '../interfaces';
import { isAuthenticated } from '../services/authService';
import { addCommentToAnArticle } from '../services/commentService';

interface CreateCommentFormProps {
    slug: string;
    onCreate: () => void;
}

const CreateCommentForm: Component<CreateCommentFormProps> = (props) => {
    const [formData, setFormData] = createSignal<CreateCommentRequest>({
        comment: {
            body: '',
        },
    });
    const [errorMessage, setErrorMessage] = createSignal('');

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        setFormData({
            comment: {
                ...formData().comment,
                [target.name]: target.value,
            },
        });
    }

    function validateForm() {
        const { body } = formData().comment;
        if (!body || body.trim() === '') {
            setErrorMessage('Comment body cannot be empty.');
            return false;
        }
        return true;
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        if (!isAuthenticated()) {
            alert('Please login to continue');
            return;
        }
        if (validateForm() == false) {
            return;
        }
        addCommentToAnArticle(props.slug, formData())
            .then(() => {
                setFormData({
                    comment: {
                        body: '',
                    },
                });
                props.onCreate();
            })
            .catch((error) => {
                console.error('Add comment error:', error);
                setErrorMessage('Failed to add comment. Please try again.');
            });
        setErrorMessage('');
    }

    return (
        <>
            <Show when={errorMessage().length > 0}>
                <ul class='error-messages'>
                    <li>{errorMessage()}</li>
                </ul>
            </Show>
            <form class='card comment-form' onSubmit={handleSubmit}>
                <div class='card-block'>
                    <textarea
                        class='form-control'
                        placeholder='Write a comment...'
                        rows='3'
                        name='body'
                        autocomplete='body'
                        value={formData().comment.body}
                        onInput={handleInputChange}
                        onClick={() => {
                            if (!isAuthenticated()) {
                                alert('Please login to continue');
                            }
                        }}
                    ></textarea>
                </div>
                <div class='card-footer'>
                    <Show when={isAuthenticated()}>
                        <img src={user.image} class='comment-author-img' />
                    </Show>
                    <button class='btn btn-sm btn-primary' type='submit'>
                        Post Comment
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateCommentForm;
