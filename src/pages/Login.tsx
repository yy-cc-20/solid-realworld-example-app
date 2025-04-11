import { createSignal, onMount, Show, type Component } from 'solid-js';
import { LoginRequest } from '../interfaces';
import { isAuthenticated, login } from '../services/authService';
import { useNavigate } from '@solidjs/router';

const Login: Component = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = createSignal({
        user: {
            email: '',
            password: '',
        },
    } as LoginRequest);
    const [errorMessage, setErrorMessage] = createSignal('');

    onMount(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    });

    function handleInputChange(event: Event) {
        const target = event.target as HTMLInputElement;
        setFormData({
            user: {
                ...formData().user,
                [target.name]: target.value,
            },
        });
    }

    function validateForm() {
        const { email, password } = formData().user;
        if (!password || !email) {
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
        login(formData())
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Login error:', error);
                setErrorMessage('Invalid email or password.');
            });
        setErrorMessage('');
    }

    return (
        <div class='auth-page'>
            <div class='container page'>
                <div class='row'>
                    <div class='col-md-6 offset-md-3 col-xs-12'>
                        <h1 class='text-xs-center'>Sign in</h1>
                        <p class='text-xs-center'>
                            <a href='/register'>Need an account?</a>
                        </p>

                        <Show when={errorMessage().length > 0}>
                            <ul class='error-messages'>
                                <li>{errorMessage()}</li>
                            </ul>
                        </Show>

                        <form onSubmit={handleSubmit}>
                            <fieldset class='form-group'>
                                <input
                                    class='form-control form-control-lg'
                                    type='text'
                                    placeholder='Email'
                                    name='email'
                                    autocomplete='email'
                                    value={formData().user.email}
                                    onInput={handleInputChange}
                                />
                            </fieldset>
                            <fieldset class='form-group'>
                                <input
                                    class='form-control form-control-lg'
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    autocomplete='current-password'
                                    value={formData().user.password}
                                    onInput={handleInputChange}
                                />
                            </fieldset>
                            <button class='btn btn-lg btn-primary pull-xs-right' type='submit'>
                                Sign in
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
