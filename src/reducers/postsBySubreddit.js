import {INVALID_SUBREDDIT, RECEIVE_POSTS, REQUEST_POSTS} from "../actions";

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: []
};

function posts(state = initialState, action) {
    switch (action.type) {
        case INVALID_SUBREDDIT:
            return {...state, didInvalidate: true};
        case REQUEST_POSTS:
            return {...state, isFetching: true, didInvalidate: false};
        case RECEIVE_POSTS:
            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receiveAt
            };
        default:
            return state
    }
}

export default function(state = {}, action) {
    switch (action.type) {
        case INVALID_SUBREDDIT:
        case REQUEST_POSTS:
        case RECEIVE_POSTS:
            return {...state, [action.subreddit]: posts(state[action.subreddit], action)};
        default:
            return state
    }

}