import React from "react";
import App from "../App";
import {shallow} from "enzyme";

const setup = (setupProps = {}) => {
    const defaultProps = {
        selectedSubreddit: 'frontend',
        isFetching: false,
        posts: [],
        handleChange: jest.fn(),
        handleRefreshClick: jest.fn()
    };
    const props = {...defaultProps, ...setupProps};
    const wrapper = shallow(<App {...props} />);

    return {
        props,
        wrapper
    }
};

describe('App Component', () => {


    test("should render without crashing", () => {
        const {wrapper} = setup();
        expect(wrapper).toMatchSnapshot();
    });

    test("should render last updated and the posts", () => {
        const {wrapper} = setup({
            lastUpdated: 1482363367071,
            posts: [
                {title: 'frontend post 1'},
                {title: 'frontend post 2'},
                {title: 'frontend post 3'},
            ]
        });
        expect(wrapper).toMatchSnapshot();
    })
});