// Show basic user info

import { A, useNavigate, useParams } from '@solidjs/router';
import { createEffect, createResource, createSignal, onMount, Show, type Component } from 'solid-js';
import { getProfile } from '../services/profileService';
import type { ArticleFilter, Profile } from '../interfaces';
import { ArticleList, FollowUnfollowButton } from '../components';
import { user } from '../stores/userStore';
import { isAuthenticated } from '../services/authService';

const Profile: Component = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [activeTab, setActiveTab] = createSignal('My Articles');
    const [profile, { refetch: refetchProfile }] = createResource<Profile>(() => getProfile(params.username));
    const [articleFilter, setArticleFilter] = createSignal<ArticleFilter>({
        feed: false,
        tag: '',
        favorited: false,
        author: user.username,
    });

    onMount(() => {
        createEffect(() => {
            refetchProfile();
        }, [location.pathname]); // re-run effect when pathname changes
    });

    return (
        <div class='profile-page'>
            <div class='user-info'>
                <div class='container'>
                    <div class='row'>
                        <div class='col-xs-12 col-md-10 offset-md-1'>
                            <img src={profile()?.image} class='user-img' />
                            <h4>{profile()?.username}</h4>
                            <p>{profile()?.bio}</p>
                            {profile.loading ? (
                                <div>Loading...</div>
                            ) : (
                                <Show when={profile()?.username != user.username && isAuthenticated()}>
                                    <FollowUnfollowButton
                                        profile={profile()!}
                                        onClick={refetchProfile}
                                        style='btn btn-sm btn-outline-secondary action-btn'
                                    />
                                </Show>
                            )}
                            <Show when={profile()?.username == user.username}>
                                <button class='btn btn-sm btn-outline-secondary action-btn' onClick={() => navigate('/settings')}>
                                    <i class='ion-gear-a'></i>
                                    &nbsp; Edit Profile Settings
                                </button>
                            </Show>
                        </div>
                    </div>
                </div>
            </div>

            <div class='container'>
                <div class='row'>
                    <div class='col-xs-12 col-md-10 offset-md-1'>
                        <div class='articles-toggle'>
                            <ul class='nav nav-pills outline-active'>
                                <li class='nav-item'>
                                    <A
                                        class='nav-link'
                                        href=''
                                        classList={{
                                            active: activeTab() === 'My Articles',
                                        }}
                                        onClick={() => {
                                            setArticleFilter((prev) => ({
                                                ...prev,
                                                favorited: false,
                                            }));
                                            setActiveTab('My Articles');
                                        }}
                                    >
                                        My Articles
                                    </A>
                                </li>
                                <li class='nav-item'>
                                    <A
                                        class='nav-link'
                                        href=''
                                        classList={{
                                            active: activeTab() === 'Favorited Articles',
                                        }}
                                        onClick={() => {
                                            setArticleFilter((prev) => ({
                                                ...prev,
                                                favorited: true,
                                            }));
                                            setActiveTab('Favorited Articles');
                                        }}
                                    >
                                        Favorited Articles
                                    </A>
                                </li>
                            </ul>
                        </div>
                        <ArticleList articleFilter={articleFilter} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
