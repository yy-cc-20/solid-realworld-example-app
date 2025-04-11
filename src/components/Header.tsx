// If no user is logged in, then the header should include links to:
// the home page
// the login page
// the register page

// If a user is logged in, then the header should include links to:
// the home page
// the new article page
// the settings page
// the profile page

// the link of the active page should use the active css class.

import { Show, type Component } from 'solid-js';
import { A } from '@solidjs/router';
import { user } from '../stores/userStore';
import { isAuthenticated } from '../services/authService';
import { nameToSlug } from '../utils';

const Header: Component = () => {
    return (
        <nav class='navbar navbar-light'>
            <div class='container'>
                <a class='navbar-brand' href='/'>
                    conduit
                </a>
                <ul class='nav navbar-nav pull-xs-right'>
                    <li class='nav-item'>
                        <A activeClass='active' class='nav-link' href='/' end>
                            Home
                        </A>
                    </li>

                    <Show when={isAuthenticated() == false}>
                        <li class='nav-item'>
                            <A activeClass='active' class='nav-link' href='/login'>
                                Sign in
                            </A>
                        </li>
                        <li class='nav-item'>
                            <A activeClass='active' class='nav-link' href='/register'>
                                Sign up
                            </A>
                        </li>
                    </Show>

                    <Show when={isAuthenticated()}>
                        <li class='nav-item'>
                            <A activeClass='active' class='nav-link' href='/editor'>
                                {' '}
                                <i class='ion-compose'></i>
                                &nbsp;New Article{' '}
                            </A>
                        </li>
                        <li class='nav-item'>
                            <A activeClass='active' class='nav-link' href='/settings'>
                                {' '}
                                <i class='ion-gear-a'></i>
                                &nbsp;Settings{' '}
                            </A>
                        </li>
                        <li class='nav-item'>
                            <A activeClass='active' class='nav-link' href={`/profile/${nameToSlug(user.username)}`}>
                                <img src={user.image} class='user-pic' />
                                {user.username}
                            </A>
                        </li>
                    </Show>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
