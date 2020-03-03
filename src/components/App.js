import React from "react";
import Picker from "./Picker";
import Posts from "./Posts";


export default class App extends React.Component {

	render() {
		const {
			selectedSubreddit,
			posts,
			isFetching,
			lastUpdated,
			handleChange,
			handleRefreshClick
		} = this.props;
		const isEmpty = posts.length === 0;

		return (
			<div>
				<Picker
					value={selectedSubreddit}
					onChange={handleChange}
					options={['reactjs', 'frontend']}
				/>
				<p>
					{lastUpdated &&
					<span>
						Last update at {new Date(lastUpdated).toLocaleDateString()}.{' '}
					</span>
					}
					{!isFetching && <button onClick={handleRefreshClick}>Refresh</button>}
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