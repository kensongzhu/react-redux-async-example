import 'cross-fetch/polyfill'
/*
Action Types
 */

export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const INVALID_SUBREDDIT = 'INVALID_SUBREDDIT';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

/*
Action Creators
 */

export function selectSubreddit(subreddit) {
    return {
        type: SELECT_SUBREDDIT,
        subreddit
    }
}


export function invalidSubreddit(subreddit) {
    return {
        type: INVALID_SUBREDDIT,
        subreddit
    }
}


export function requestPosts(subreddit) {
    return {
        type: REQUEST_POSTS,
        subreddit
    }
}


export function receivePosts(subreddit, json) {
    return {
        type: RECEIVE_POSTS,
        subreddit,
        posts: json.data.children.map(child => child.data),
        receiveAt: Date.now()
    }
}

function shouldFetchPosts(state, subreddit) {
    const posts = state.postsBySubreddit[subreddit];

    if (!posts) {
        return true
    } else if (posts.isFetching) {
        return false
    } else {
        return posts.didInvalidate
    }
}


export function fetchPosts(subreddit) {

    return function(dispatch) {
        // First dispatch: the app state is updated to inform
        // that the API call is starting
        dispatch(requestPosts(subreddit));

        return fetch(`https://www.reddit.com/r/${subreddit}.json`).then(
            response => response.json(),
            // Do not use catch because that will also catch any errors
            // causing in the dispatch and resulting render,
            // causing a loop of 'Unexpected batch number' errors
            error => console.log('An error occurred.', error)
        ).then(json => dispatch(receivePosts(subreddit, json)));
    }
}

export function fetchPostsIfNeeded(subreddit) {

    return function(dispatch, getState) {
        if (shouldFetchPosts(getState(), subreddit)) {
            return dispatch(fetchPosts(subreddit));
        } else {
            // Let the calling code know there's nothing to wait for.
            return Promise.resolve()
        }

    }
}