import React from "react";


export default class Posts extends React.Component {
    render() {
        const {posts} = this.props;
        return (
            <ul>
                {posts.map((post, i) => (<li key={i}>{post.title}</li>))}
            </ul>
        );
    }
}