import { JSX, type Component } from 'solid-js';
import { toggleFollowUser } from '../service';
import { Profile } from '../../manageProfile';
import { isAuthenticated } from '../../manageAccess';
import { user } from '../../manageAccess';

interface FollowUnfollowButtonProps {
    children?: JSX.Element;
    profile: Profile;
    onClick: () => void;
    style: string;
}

const FollowUnfollowButton: Component<FollowUnfollowButtonProps> = (props) => {
    return (
        <button
            class={props.style}
            classList={{
                active: props.profile.following,
            }}
            onClick={() => {
                if (!isAuthenticated()) {
                    alert('Please login to continue');
                    return;
                }
                if (props.profile.username === user.username) {
                    alert('You cannot follow yourself.');
                    return;
                }
                toggleFollowUser(props.profile.username ?? '');
                props.onClick();
            }}
        >
            <i class='ion-plus-round'></i>
            &nbsp; {props.profile.following ? 'Following' : `Follow ${props.profile.username}`}
            {props.children}
        </button>
    );
};

export default FollowUnfollowButton;
