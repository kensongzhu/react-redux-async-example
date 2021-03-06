import React from "react";
import {connect} from "react-redux";
import App from "../components/App";
import {fetchPostsIfNeeded, invalidateSubreddit, selectSubreddit} from "../actions";

class RedditApp extends React.Component {

    componentDidMount() {
        const {dispatch, selectedSubreddit} = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.selectedSubreddit !== this.props.selectedSubreddit) {
            const {dispatch, selectedSubreddit} = this.props;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));
        }
    }

    handleChange = nextSubreddit => {
        this.props.dispatch(selectSubreddit(nextSubreddit));
    };

    handleRefreshClick = e => {
        e.preventDefault();

        const {dispatch, selectedSubreddit} = this.props;
        // why invalidate?
        // force it being invalidate, so that forcefully refresh
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    };

    render() {
        const handlers = {handleRefreshClick: this.handleRefreshClick, handleChange: this.handleChange};
        return <App {...{...this.props, ...handlers}} />
    }
}

const mapStateToProps = state => {
    const {selectedSubreddit, postsBySubreddit} = state;
    const {isFetching, lastUpdated, items: posts} = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    };
    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
};


export default connect(mapStateToProps)(RedditApp)