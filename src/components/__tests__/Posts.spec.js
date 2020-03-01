import React from "react";
import {shallow} from "enzyme";
import Posts from "../Posts";

const setup = (setupProps = []) => {
    const defaultProps = [
        {title: "subreddit 1"},
        {title: "subreddit 2"},
        {title: "subreddit 3"}
    ];
    const props = [...defaultProps, ...setupProps];
    const wrapper = shallow(<Posts posts={props}/>);

    return {
        props,
        wrapper
    }
};

describe("Posts", () => {
    test("renders without crashing", () => {
        const {wrapper} = setup();
        expect(wrapper).toMatchSnapshot();
    });
});
