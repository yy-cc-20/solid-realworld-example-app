import { createSignal, onMount, Show, type Component } from 'solid-js';
import { UpdateUserRequest } from '../types';
import { useNavigate } from '@solidjs/router';
import { getCurrentUser, logout } from '../../manageAccess';
import { updateProfile } from '../service';
import { ProtectedRouteGuard } from '../../../app/routeGuards';

const Settings: Component = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = createSignal({
        user: {
            email: '',
            username: '',
            bio: '',
            password: '',
            image: '',
        },
    } as UpdateUserRequest);
    const [errorMessage, setErrorMessage] = createSignal('');

    onMount(() => {
        ProtectedRouteGuard();
        getUserDataForEditing();
    });

    async function getUserDataForEditing() {
        const currentUser = await getCurrentUser();
        setFormData({
            user: {
                email: currentUser.email!,
                username: currentUser.username!,
                bio: currentUser.bio!,
                password: '',
                image: currentUser.image!,
            },
        });
    }

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
        return true;
    }

    function handleSubmit(event: Event) {
        event.preventDefault();
        if (validateForm() === false) {
            return;
        }
        updateProfile(formData())
            .then(() => {
                console.log('Form submitted:', formData());
            })
            .catch((error) => {
                console.error('Update user error:', error);
                setErrorMessage('Invalid email or password.');
            });
        setErrorMessage('');
    }

    function handleLogout() {
        logout();
        navigate('/');
    }

    return (
        <div class='settings-page'>
            <div class='container page'>
                <div class='row'>
                    <div class='col-md-6 offset-md-3 col-xs-12'>
                        <h1 class='text-xs-center'>Your Settings</h1>

                        <Show when={errorMessage().length > 0}>
                            <ul class='error-messages'>
                                <li>{errorMessage()}</li>
                            </ul>
                        </Show>

                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset class='form-group'>
                                    <input
                                        class='form-control'
                                        type='text'
                                        placeholder='URL of profile picture'
                                        name='image'
                                        value={formData().user.image}
                                        onInput={handleInputChange}
                                    />
                                </fieldset>
                                <fieldset class='form-group'>
                                    <input
                                        class='form-control form-control-lg'
                                        type='text'
                                        placeholder='Your Name'
                                        name='username'
                                        value={formData().user.username}
                                        onInput={handleInputChange}
                                    />
                                </fieldset>
                                <fieldset class='form-group'>
                                    <textarea
                                        class='form-control form-control-lg'
                                        rows='8'
                                        placeholder='Short bio about you'
                                        name='bio'
                                        value={formData().user.bio}
                                        onInput={handleInputChange}
                                    ></textarea>
                                </fieldset>
                                <fieldset class='form-group'>
                                    <input
                                        class='form-control form-control-lg'
                                        type='text'
                                        placeholder='Email'
                                        name='email'
                                        value={formData().user.email}
                                        onInput={handleInputChange}
                                    />
                                </fieldset>
                                <fieldset class='form-group'>
                                    <input
                                        class='form-control form-control-lg'
                                        type='password'
                                        placeholder='New Password'
                                        name='password'
                                        value={formData().user.password}
                                        onInput={handleInputChange}
                                    />
                                </fieldset>
                                <button class='btn btn-lg btn-primary pull-xs-right' type='submit'>
                                    Update Settings
                                </button>
                            </fieldset>
                        </form>
                        <hr />
                        <button class='btn btn-outline-danger' onClick={handleLogout}>
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
