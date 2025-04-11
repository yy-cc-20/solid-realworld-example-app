import { useNavigate, useParams } from '@solidjs/router';
import { createEffect, createSignal, onMount, Show, type Component } from 'solid-js';
import { isAuthenticated } from '../services/authService';
import { CreateArticleRequest } from '../interfaces';
import { createArticle, getArticleDetail } from '../services/articleService';
import { nameToSlug } from '../utils';

const CreateEditArticle: Component = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = createSignal<CreateArticleRequest>({
        article: {
            title: '',
            description: '',
            body: '',
            tagList: [],
        },
    });
    const [errorMessage, setErrorMessage] = createSignal('');

    onMount(() => {
        if (!isAuthenticated()) {
            navigate('/login');
        }

        createEffect(() => {
            setErrorMessage('');
        }, [location.pathname]); // re-run effect when pathname changes

        if (params.slug) {
            getArticleDataForEditing();
        }
    });

    async function getArticleDataForEditing() {
        const articleData = await getArticleDetail(params.slug);
        setFormData({
            article: {
                title: articleData.title,
                description: articleData.description,
                body: articleData.body,
                tagList: articleData.tagList,
            },
        });
    }

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        setFormData({
            article: {
                ...formData().article,
                [target.name]: target.value,
            },
        });
    }

    function validateForm() {
        const { title, description, body } = formData().article;
        if (!title || !description || !body) {
            return false;
        }
        return true;
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        if (validateForm() == false) {
            setErrorMessage('Please fill out all fields correctly.');
            return;
        }
        createArticle(formData())
            .then(() => {
                navigate('/article/' + nameToSlug(formData().article.title));
            })
            .catch((error) => {
                console.error('Create article error:', error);
                setErrorMessage('Error creating article. Please try again.');
            });
        setErrorMessage('');
    }

    return (
        <>
            <div class='editor-page'>
                <div class='container page'>
                    <div class='row'>
                        <div class='col-md-10 offset-md-1 col-xs-12'>
                            <Show when={errorMessage().length > 0}>
                                <ul class='error-messages'>
                                    <li>{errorMessage()}</li>
                                </ul>
                            </Show>

                            <form onSubmit={handleSubmit}>
                                <fieldset>
                                    <fieldset class='form-group'>
                                        <input
                                            type='text'
                                            class='form-control form-control-lg'
                                            placeholder='Article Title'
                                            name='title'
                                            autocomplete='title'
                                            value={formData().article.title}
                                            onInput={handleInputChange}
                                        />
                                    </fieldset>
                                    <fieldset class='form-group'>
                                        <input
                                            type='text'
                                            class='form-control'
                                            placeholder="What's this article about?"
                                            name='description'
                                            autocomplete='description'
                                            value={formData().article.description}
                                            onInput={handleInputChange}
                                        />
                                    </fieldset>
                                    <fieldset class='form-group'>
                                        <textarea
                                            class='form-control'
                                            rows='8'
                                            placeholder='Write your article (in markdown)'
                                            name='body'
                                            autocomplete='body'
                                            value={formData().article.body}
                                            onInput={handleInputChange}
                                        ></textarea>
                                    </fieldset>
                                    <fieldset class='form-group'>
                                        <input type='text' class='form-control' placeholder='Enter tags' />
                                        <div class='tag-list'>
                                            <span class='tag-default tag-pill'>
                                                {' '}
                                                <i class='ion-close-round'></i> tag{' '}
                                            </span>
                                        </div>
                                    </fieldset>
                                    <button class='btn btn-lg pull-xs-right btn-primary' type='submit'>
                                        Publish Article
                                    </button>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateEditArticle;
