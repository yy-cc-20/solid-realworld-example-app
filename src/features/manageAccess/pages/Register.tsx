// Uses JWT (store the token in localStorage)
// Authentication can be easily switched to session/cookie based

import { createSignal, onMount, Show, type Component } from 'solid-js';
import { RegistrationRequest } from '../types';
import { register } from '../service';
import { useNavigate } from '@solidjs/router';
import { AuthRouteGuard } from '../../../app';

const Register: Component = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = createSignal({
        user: {
            username: '',
            email: '',
            password: '',
        },
    } as RegistrationRequest);
    const [errorMessage, setErrorMessage] = createSignal('');

    onMount(() => {
        AuthRouteGuard();
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
        const { username, email, password } = formData().user;
        if (!password || !email || !username) {
            return false;
        }
        return true;
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        if (validateForm() === false) {
            setErrorMessage('Please fill out all fields correctly.');
            return;
        }
        register(formData())
            .then(() => {
                console.log('Form submitted:', formData());
                navigate('/');
            })
            .catch((error) => {
                console.error('Registration error:', error);
                setErrorMessage('That email is already taken');
            });
        setErrorMessage('');
    }

    return (
        <div class='auth-page'>
            <div class='container page'>
                <div class='row'>
                    <div class='col-md-6 offset-md-3 col-xs-12'>
                        <h1 class='text-xs-center'>Sign up</h1>
                        <p class='text-xs-center'>
                            <a href='/login'>Have an account?</a>
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
                                    placeholder='Username'
                                    name='username'
                                    autocomplete='username'
                                    value={formData().user.username}
                                    onInput={handleInputChange}
                                />
                            </fieldset>
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
                                    autocomplete='new-password'
                                    value={formData().user.password}
                                    onInput={handleInputChange}
                                />
                            </fieldset>
                            <button class='btn btn-lg btn-primary pull-xs-right' type='submit'>
                                Sign up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
