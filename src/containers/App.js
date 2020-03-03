import React from "react";
import Picker from "../components/Picker";
import Posts from "../components/Posts";
import {connect} from "react-redux";
import {fetchPostsIfNeeded, invalidateSubreddit, selectSubreddit} from "../actions";

class App extends React.Component {

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
		dispatch(invalidateSubreddit(selectedSubreddit));
		dispatch(fetchPostsIfNeeded(selectedSubreddit));
	};

	render() {
		const {selectedSubreddit, posts, isFetching, lastUpdated} = this.props;
		const isEmpty = posts.length === 0;

		return (
			<div>
				<Picker
					value={selectedSubreddit}
					onChange={this.handleChange}
					options={['reactjs', 'frontend']}
				/>
				<p>
					{lastUpdated &&
					<span>
						Last update at {new Date(lastUpdated).toLocaleDateString()}.{' '}
					</span>
					}.

					{!isFetching && <button onClick={this.handleRefreshClick}>Refresh</button>}
				</p>
				{isEmpty
					? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
					: <div style={{opacity: isFetching ? 0.5 : 1}}>
						<Posts posts={posts}/>
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = state => {
	const {selectedSubreddit, postsBySubreddit} = state;
	const {isFetching, lastUpdated, items: posts} = postsBySubreddit[selectedSubreddit] || {isFetching: true, items: []}
	return {
		selectedSubreddit,
		posts,
		isFetching,
		lastUpdated
	}
};


export default connect(mapStateToProps)(App)